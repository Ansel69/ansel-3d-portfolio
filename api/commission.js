// Serverless API Handler for Vercel: /api/commission
// Handles commission requests cleanly and securely with zero leaks.

export default async function handler(req, res) {
    // Set CORS and Security headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are supported.'
        });
    }

    try {
        const { name, email, projectType, budget, brief } = req.body || {};

        // Validation
        if (!name || !email || !brief) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Nama, email, dan deskripsi brief wajib diisi.'
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid Email',
                message: 'Format email tidak valid.'
            });
        }

        // Sanitize string inputs (prevent HTML injection)
        const sanitize = (str) => String(str || '').replace(/[<>]/g, '').trim();
        const safeData = {
            name: sanitize(name),
            email: sanitize(email),
            projectType: sanitize(projectType || 'Cute Mascot / Character'),
            budget: sanitize(budget || 'Default Tier'),
            brief: sanitize(brief),
            timestamp: new Date().toISOString()
        };

        console.log(`[Commission Inquiry Received] from ${safeData.name} (${safeData.email}) for ${safeData.projectType}`);

        // Optional Webhook notification if configured in Vercel environment variables
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.TELEGRAM_WEBHOOK_URL;
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `💌 **New 3D Commission Inquiry!**\n**Name:** ${safeData.name}\n**Email:** ${safeData.email}\n**Category:** ${safeData.projectType}\n**Budget:** ${safeData.budget}\n**Brief:** ${safeData.brief}`
                    })
                });
            } catch (notifyErr) {
                console.warn('Webhook notification failed (non-blocking):', notifyErr.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: `Terima kasih, ${safeData.name}! Brief proyek Anda telah berhasil kami terima. Ansel akan segera menghubungi Anda melalui ${safeData.email}. 🐾`,
            data: {
                name: safeData.name,
                projectType: safeData.projectType,
                receivedAt: safeData.timestamp
            }
        });
    } catch (err) {
        console.error('Commission API Error:', err);
        return res.status(500).json({
            error: 'Server Error',
            message: 'Terjadi kendala saat memproses permohonan. Silakan hubungi langsung ke ansel003455@gmail.com.'
        });
    }
}
