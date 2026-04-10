import transporter from "../config/Mailer.js";
import EmailTasksRepository from "../repository/EmailTasksRepository.js";
import StudentsRepository from "../repository/StudentsRepository.js";
import HttpException from "../utils/HttpException.js";

class EmailService {
    async sendEmails(data) {
        try {
            // cria a task antes de começar a operação
            const task = await EmailTasksRepository.create({
                total: data.students.length,
                processed: 0
            })

            // inicia o processo com promisse para n lockar o end-point
            const emailPromises = data.students.map(async (id, index) => {
                // gambiarra para disparar um de cada vez, pra n tomar timeout do SMTP
                await new Promise(resolve => setTimeout(resolve, index * 1000));
                try {
                    const student = await StudentsRepository.findOneById(id);
                    if(!student) throw new Error(`Estudante com o id: "${id}" não foi encontrado.`);

                    const emailOptions = {
                        from: '"Teste api envio de certificados" <revistacientificasenai@sp.senai.br>',
                        to: student.email,
                        subject: "Testando envio de email",
                        html: `
                            <div>
                                <h1>Teste do html</h1>
                                <p>Body request teste:<p>
                                <p>Seu nome no banco de dados: ${student.name}</p>
                            </div>
                        `
                    };
                        
                    await transporter.sendMail(emailOptions);

                    // atualiza o processo no DB
                    await EmailTasksRepository.updateProgress(task.id);

                    return { id: id, status: 'SENT' };
                } catch(err) {
                    return { id: id, status: 'FAILED', error: err.message };
                }
            });

            const results = await Promise.all(emailPromises);

            // filtra entre os q deu bom ou n
            const successes = results.filter(r => r.status === 'SENT').map(r => r.id);
            const failures = results.filter(r => r.status === 'FAILED').map(r => r.id);

            // mandaria a query para a tabela de logs, mas por enquanto é só um consolog
            const emailLog = ({
                email_task_id: task.id,
                delivered_successes: successes,
                delivered_failures: failures,
            })

            console.table({emailLog});

            await EmailTasksRepository.updateStatus(task.id, "COMPLETED");
        } catch(err) {
            await EmailTasksRepository.updateStatus(task.id, 'ERROR');
            console.log(err);
            throw err;
        }
    }
}

export default new EmailService();