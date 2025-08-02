// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "securepassword123",
      name: "Admin",
      role: "admin",
    },
  });

  await prisma.category.create({
    data: {
      slug: "health",
      translations: [
        { lang: "en", name: "Health" },
        { lang: "km", name: "សុខភាព" },
      ],
    },
  });

  await prisma.product.create({
    data: {
      image: "https://example.com/image.jpg",
      isTopSell: true,
      price: 4.99,
      slug: "balm-oil",
      translations: [
        { lang: "en", name: "Balm Oil", description: "A relaxing balm" },
        {
          lang: "km",
          name: "ប្រេងបាល់ម៍",
          description: "ប្រេងសម្រាប់ផ្តល់ការធូរស្បើយ",
        },
      ],
    },
  });
}

main()
  .then(() => {
    console.log("✅ Seed completed!");
  })
  .catch((e) => {
    console.error("❌ Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
