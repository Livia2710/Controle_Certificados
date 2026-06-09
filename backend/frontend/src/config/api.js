/**
 * Configuração centralizada para a API do backend
 * Usa variável de ambiente VITE_API_URL (ou padrão localhost:5000)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export { API_URL };
