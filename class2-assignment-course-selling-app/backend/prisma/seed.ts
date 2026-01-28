import { prisma } from "../db"


async function main() {
    const user = await prisma.user.create({
        data : {
            email : 'email@gmail.com',
            password : "password123",
            name : "nobitakaif",
            role : "Student",
            Course : {
                create : {
                    description :"This is testing descriptoin not related to acutal description. This will not appears in Production",
                    price : 20000,
                    title : "Seed",
                    lesson : {
                        create : {
                            content : "I am MOHD KAIF noob Devloper, I want to become powerfull Developer, and i will do everything fot that",
                            title : "How to generate seed",
                        }
                    },
                    // purchases:{
                    //     create : {
                    //         userId : 
                    //     }
                    // }
                }
            }
        }
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })