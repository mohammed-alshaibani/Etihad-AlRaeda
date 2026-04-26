import config from './payload.config'
import { getPayload } from 'payload'
import 'dotenv/config'

const run = async () => {
    try {
        const payload = await getPayload({ config })

        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@ssv.com',
                password: 'password123',
                name: 'System Admin',
                role: 'superadmin'
            }
        })

        console.log("✅ Superadmin created successfully! You can now log in with email: admin@ssv.com | password: password123")
        process.exit(0)
    } catch (error) {
        console.error("Error creating admin:", error.message)
        process.exit(1)
    }
}

run()
