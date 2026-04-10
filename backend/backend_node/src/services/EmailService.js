import transporter from "../config/Mailer.js";
import EmailLogsRepository from "../repository/EmailLogsRepository.js";
import EmailTasksRepository from "../repository/EmailTasksRepository.js";
import StudentsRepository from "../repository/StudentsRepository.js";
import HttpException from "../utils/HttpException.js";

class EmailService {
    async sendEmails(data) {
        // cria a task antes de começar a operação
        const task = await EmailTasksRepository.create({
            total: data.students.length,
            processed: 0
        })

        // colocando a variavel de email fora do try para ser usado no catch de log tbm
        let studentEmail =  "Student email not found";

        try {
            // inicia o processo com promisse para n lockar o end-point
            const emailPromises = data.students.map(async (id, index) => {

                // gambiarra para disparar um de cada vez, pra n tomar timeout do SMTP
                await new Promise(resolve => setTimeout(resolve, index * 1000));

                try {
                    const student = await StudentsRepository.findOneById(id);
                    if(!student) throw new Error(`Estudante com o id: "${id}" não foi encontrado.`);
                    
                    studentEmail = student.email;

                    await this.#inviteEmailsWithCertificate(studentEmail, student.name, data.project_name, data.qtd_hours)

                    // atualiza o processo no DB
                    await EmailTasksRepository.updateProgress(task.id);

                    return { id: id, email: studentEmail, status: 'SENT' };
                } catch(err) {
                    return { id: id, email: studentEmail, status: 'FAILED', error: err.message };
                }
            });

            const results = await Promise.all(emailPromises);

            // filtra entre os q deu bom ou n
            const successes = results.filter(r => r.status === 'SENT').map(r => r.email);
            const failures = results.filter(r => r.status === 'FAILED').map(r => r.email);

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
            console.log(err);
            throw err;
        }
    }

    async #inviteEmailsWithCertificate(studentEmail, studentName, projectName, amountHours) {
        try {
            const emailOptions = {
                from: '"Teste api envio de certificados" <revistacientificasenai@sp.senai.br>',
                to: studentEmail,
                subject: "Envio de certificado",
                html: `
                    <div>
                        <p>Aluno ${studentName} ganhou ${amountHours} horas no projeto "${projectName}"<p>
                    </div>
                `
            };
                            
            await transporter.sendMail(emailOptions);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default new EmailService();