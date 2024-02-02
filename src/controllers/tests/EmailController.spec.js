const EmailController = require('../emailController')
const EmailQueue = require('../../queue/MailQueue')

jest.mock("../../queue/MailQueue")

describe("Email Controller", ()=>{
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should send e-mail successfully", async ()=>{
    const request = {
      body:{
        email:"camilabbreda@gmail.com",
        firstName:"Camila",
        lastName:"Breda"
      }
    }
    const reply	={
      code: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    await EmailController.sendEmail(request, reply)

    expect(EmailQueue.add).toHaveBeenCalledTimes(1)
    expect(EmailQueue.add).toHaveBeenCalledWith({
      to:"camilabbreda@gmail.com",
      from: process.env.EMAIL_FROM,
      subject: "Assinatura Confirmada",
      text: `
        Olá Camila Breda, sua assinatura foi confirmada!
        Para acessar seus recursos exclusivos você precisa basta clicar aqui.
    `,
    })
    expect(reply.code).toHaveBeenCalledWith(200)
    expect(reply.send).toHaveBeenCalledTimes(1);
  } )
})

// function sum(a,b){
//   return a+b
// }
// describe("Inicial Tests", ()=>{
//   it("First unit test", ()=>{
//     const firstArgument = 7;
//     const secondArgument = 1;

//     let result = sum(firstArgument, secondArgument)

//     expect(result).toEqual(8)
//   })
// })

// describe("Inicial Tests", ()=>{
//   it("Second unit test", ()=>{
//     const firstArgument = 7;
//     const secondArgument = 1;

//     let result = sum(firstArgument, secondArgument)

//     expect(result).toEqual(9)
//   })
// })

// const MailQueue = require('../../queue/MailQueue');
// const { sendEmail } = require('../emailController');

// jest.mock('../../queue/MailQueue');

// describe('sendEmail', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should send an email successfully and return 200', async () => {
//     const request = {
//       body: {
//         email: 'test@example.com',
//         firstName: 'John',
//         lastName: 'Doe',
//       },
//     };
//     const reply = {
//       code: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     await sendEmail(request, reply);

//     expect(MailQueue.add).toHaveBeenCalledTimes(1);
//     expect(MailQueue.add).toHaveBeenCalledWith({
//       to: 'test@example.com',
//       from: process.env.EMAIL_FROM,
//       subject: 'Assinatura Confirmada',
    //   text: `
    //     Olá John Doe, sua assinatura foi confirmada!
    //     Para acessar seus recursos exclusivos você precisa basta clicar aqui.
    // `,
//     });
//     expect(reply.code).toHaveBeenCalledWith(200);
//     expect(reply.send).toHaveBeenCalledTimes(1);
//   });

//   it('should handle errors and return 500 status code', async () => {
//     const request = {
//       body: {
//         email: 'test@example.com',
//         firstName: 'John',
//         lastName: 'Doe',
//       },
//     };
//     const reply = {
//       code: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     MailQueue.add.mockRejectedValue(new Error('Some error'));

//     await sendEmail(request, reply);

//     expect(MailQueue.add).toHaveBeenCalledTimes(1);
//     expect(reply.code).toHaveBeenCalledWith(500);
//     expect(reply.send).toHaveBeenCalledWith('Internal Server Error');
//   });
// });
