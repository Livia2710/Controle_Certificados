import transporter from "../config/Mailer.js";
import EmailLogsRepository from "../repository/EmailLogsRepository.js";
import EmailTasksRepository from "../repository/EmailTasksRepository.js";
import StudentsRepository from "../repository/StudentsRepository.js";
import { generatePdfBuffer } from "../utils/GeneratePdfBuffer.js";
import { renderTemplate } from "../utils/renderTemplate.js";
import { templateConfig } from "../config/TemplateConfig.js";
import { loadImageBase64, loadSvgRaw, loadFontBase64 } from "../utils/loadAssets.js";
import HttpException from "../utils/HttpException.js";
import fs from "fs";

class EmailService {
    async sendEmails(data, userId) {
        // cria a task antes de começar a operação
        const task = await EmailTasksRepository.create({
            total: data.students.length,
            processed: 0,
            user_id: userId
        })

        try {
            const results = [];

            // Usando for para arrumar o erro de timeout do gerador de pdf
            for (const id of data.students) {
                let studentEmail = "Student email not found";

                try {
                    const student = await StudentsRepository.findOneById(id);
                    if(!student) throw new Error(`Estudante com o id: "${id}" não foi encontrado.`);
                    
                    studentEmail = student.email;

                    await this.#inviteEmailsWithCertificate(studentEmail, student.name, data.project_name, data.qtd_hours, data.template);

                    await EmailTasksRepository.updateProgress(task.id);

                    results.push({ id: id, email: studentEmail, status: 'SENT' });
                    
                    await new Promise(resolve => setTimeout(resolve, 1000)); 

                } catch(err) {
                    console.log(`DEU MERDA NO LOOP, student_id: ${id}:`, err);
                    results.push({ id: id, email: studentEmail, status: 'FAILED', error: err.message });
                }
            }

            const successes = results.filter(r => r.status === 'SENT').map(r => r.email);
            const failures = results.filter(r => r.status === 'FAILED').map(r => r.email);

            console.log(`Emails que deram bons:`);
            console.log(successes);

            console.log(`Emails que deram ruim:`);
            console.log(failures);

            // cria o objeto de log e manda para o banco de dados
            const emailLog = ({
                email_task_id: task.id,
                success_delivered: successes,
                failed_delivered: failures,
            })
            await EmailLogsRepository.create(emailLog);

            await EmailTasksRepository.updateStatus(task.id, "COMPLETED");
        } catch(err) {
            await EmailTasksRepository.updateStatus(task.id, 'FAILED');
            console.log("ERRO FATAL NA TASK:", err);
            throw err;
        }
    }

    async getEmailsTasksPaginated(page = 1, limit = 10, userId) {
        try {
            const offset = (page - 1) * limit;

            const result = await EmailTasksRepository.findAllPaginated(limit, offset, userId);

            return result;
        } catch (err) {
            throw err;
        }
    }

    async #inviteEmailsWithCertificate(studentEmail, studentName, projectName, amountHours, templateName = "premium") {
        try {

            const config =  templateConfig[templateName];

            if(!config) {
                throw new Error(`Template "${templateName}" não encontrado`);
            }

            //Fonts
            const dancingScript = loadFontBase64("assets/fonts/DancingScript.ttf");
            const playfair = loadFontBase64("assets/fonts/PlayfairDisplay-Bold.ttf");

            
            //Imagens
            const logo = loadImageBase64(config.assets.logo || "assets/logo.png");

            let templateData = {
                name: studentName,
                project: projectName,
                hours: amountHours,
                logo,
                dancingScript,
                playfair
            };

            if (config.assets.top) {
                templateData.topImage = loadSvgRaw(config.assets.top);
            }

            if (config.assets.bottom) {
                templateData.bottomImage = loadSvgRaw(config.assets.bottom);
            }

            if(config.assets.border) {
                templateData.borderImage = loadSvgRaw(config.assets.border);
            }

            const html = renderTemplate(config.file, templateData);

            const pdfBuffer = await generatePdfBuffer(html);

            const emailOptions = {
                from: '"Teste api envio de certificados" <revistacientificasenai@sp.senai.br>',
                to: studentEmail,
                subject: `Envio de certificado de horas - ${projectName}`,
                html: `<p>Olá! Segue em anexo o seu certificado.</p>`,
                attachments: [
                    {
                        filename: `Certificado_${studentName.replace(/\s/g, '_')}_${projectName}.pdf`,
                        content: pdfBuffer
                    }
                ]
            };
                            
            await transporter.sendMail(emailOptions);
        } catch (err) {
            console.log("ERRO REAL", err);
            throw err;
        }
    }
}

export default new EmailService();