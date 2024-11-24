const https = require('https');
const crypto = require('crypto');

const targetHash = '578ed5a4eecf5a15803abdc49f6152d6'; // Hash target
const dictionaryURL = 'https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/500-worst-passwords.txt'; // URL file

const dictionaryAttack = () => {
    https.get(dictionaryURL, (res) => {
        let data = '';

        // Kumpulkan data dari stream
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Ketika selesai, proses password
        res.on('end', () => {
            const passwords = data.split('\n');
            for (let password of passwords) {
                const hash = crypto.createHash('md5').update(password.trim()).digest('hex'); // Hash setiap password
                if (hash === targetHash) {
                    console.log(`Password ditemukan: ${password.trim()}`);
                    return;
                }
            }
            console.log('Password tidak ditemukan.');
        });
    }).on('error', (err) => {
        console.error('Error:', err.message);
    });
};

dictionaryAttack();