import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "alldavi011@gmail.com",
      phone: "+12345678901",
      password: "mega1234$", // plain text
      otp: null,
      firstName: "Carlson",
      lastName: "Alan",
      middleName: "Anthony",
      dateOfBirth: new Date("1990-05-15"),
      gender: "Male",
      address: "123 Elm Street",
      city: "Houston",
      state: "Texas",
      country: "USA",
      ssn: "123456789",
      occupation: "Software Engineer",
      employerName: "Wayse Technologies",
      maritalStatus: "Single",
      accountNumber: "00123456789",
      accountType: "Checking",
      balance: 5000.0,
      currency: "USD",
      isVerified: true,
      kycLevel: "Level 2",
      profileImageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      hasPaidTransferFee: true,
    },
  });

  console.log("✅ User seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
