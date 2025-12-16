import mongoose from 'mongoose';
import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Iniciar servidor
    const server = app.listen(env.PORT, () => {
      console.log(`\n🚀 Servidor corriendo en puerto ${env.PORT}`);
      console.log(`📚 Documentación: http://localhost:${env.PORT}/docs`);
      console.log(`🏥 Health check: http://localhost:${env.PORT}/api/health`);
      console.log(`🌍 Ambiente: ${env.NODE_ENV}\n`);
    });

    // Manejo de cierre graceful
    const gracefulShutdown = async (signal) => {
      console.log(`\n⚠️  ${signal} recibido, cerrando servidor...`);
      
      server.close(async () => {
        console.log('✅ Servidor HTTP cerrado');
        
        try {
          await mongoose.connection.close();
          console.log('✅ Conexión MongoDB cerrada');
          process.exit(0);
        } catch (err) {
          console.error('❌ Error cerrando MongoDB:', err);
          process.exit(1);
        }
      });

      // Forzar cierre después de 10s
      setTimeout(() => {
        console.error('⏱️  Timeout, forzando cierre');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

startServer();
