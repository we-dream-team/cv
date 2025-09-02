const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  console.log('🚀 Lambda notify appelée');
  
  try {
    // Parser le body de la requête
    const body = JSON.parse(event.body || '{}');
    console.log('📥 Corps de la requête reçu:', body);
    
    const { email, downloadTime } = body;
    
    if (!email || !downloadTime) {
      console.error('❌ Données manquantes:', { email, downloadTime });
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          message: 'Email et downloadTime requis'
        })
      };
    }
    
    // Log de la notification
    console.log(`📧 CV téléchargé par: ${email} à ${downloadTime}`);
    console.log(`🔑 Clé API Resend configurée: ${process.env.RESEND_API_KEY ? 'OUI' : 'NON'}`);
    console.log(`📧 Email de notification: ${process.env.RESEND_ACCOUNT_EMAIL}`);
    
    // Envoi de l'email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        console.log('📤 Tentative d\'envoi via Resend...');
        
        const { data, error } = await resend.emails.send({
          from: 'noreply@resend.dev',
          to: process.env.RESEND_ACCOUNT_EMAIL,
          subject: '🎯 Nouveau téléchargement de CV',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                📄 Nouveau téléchargement de CV
              </h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Détails du téléchargement</h3>
                <p><strong>👤 Email du visiteur:</strong> ${email}</p>
                <p><strong>📅 Date et heure:</strong> ${downloadTime}</p>
                <p><strong>🕐 Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
              
              <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #065f46;">
                  <strong>✅ Action effectuée:</strong> Votre CV a été téléchargé avec succès par un visiteur.
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 14px; text-align: center;">
                Notification automatique - CV Fayçal ZOUAOUI
              </p>
            </div>
          `
        });
        
        if (error) {
          console.error('❌ Erreur Resend:', error);
        } else {
          console.log('✅ Email envoyé via Resend:', data);
        }
        
      } catch (resendError) {
        console.error('❌ Erreur lors de l\'envoi Resend:', resendError);
      }
    } else {
      console.log('⚠️ Clé API Resend non configurée');
    }
    
    // Données de notification
    const notificationData = {
      visitorEmail: email,
      downloadTime: downloadTime,
      notificationSent: true,
      timestamp: new Date().toISOString(),
      emailService: 'Resend'
    };
    
    console.log('📊 Données de notification:', notificationData);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Notification envoyée avec succès',
        data: notificationData
      })
    };
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la notification:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        message: 'Erreur lors de l\'envoi de la notification'
      })
    };
  }
};
