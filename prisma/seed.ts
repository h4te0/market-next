// import { hashSync } from 'bcrypt';
import { prisma } from '../src/shared/api/prisma-client';

import { brands, categories, smartphones } from './data';

async function up() {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       fullName: 'admin',
  //       email: 'admin@mail.ru',
  //       password: hashSync('admin', 10),
  //       verified: new Date(),
  //       role: 'ADMIN',
  //     },
  //     {
  //       fullName: 'user',
  //       email: 'user@mail.ru',
  //       password: hashSync('user', 10),
  //       verified: new Date(),
  //       role: 'USER',
  //     },
  //   ],
  // });

  await prisma.brand.createMany({
    data: brands,
  });

  await prisma.category.createMany({
    data: categories,
  });

  smartphones.map((phone) =>
    phone.brand?.map(async (obj) => {
      await prisma.product.create({
        data: {
          article: Number(obj.article),
          title: obj.title,
          slug: obj.slug,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit libero at molestie elementum. Cras porttitor efficitur risus a eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In lacinia cursus gravida. Vestibulum convallis, magna id mattis egestas, odio lectus finibus augue, sit amet egestas tortor justo at nisl. Ut fermentum augue vitae aliquam cursus. Morbi in interdum massa, id porttitor dolor. Nunc pharetra feugiat eros quis rutrum. Cras porta leo metus, a convallis ante vehicula eu. Vivamus diam turpis, tincidunt in maximus ut, faucibus a dui. Suspendisse arcu felis, auctor nec ultrices et, egestas sit amet lorem. Donec nec ante eget mi posuere condimentum. Duis rutrum quam vitae sagittis tristique. Suspendisse vitae lectus eu diam finibus imperdiet. Nunc congue, mi vel finibus aliquam, augue dolor laoreet turpis, at pellentesque lectus eros nec felis.',
          price: Number(obj.price),
          images: [
            ...obj.images.map((image) => 'https://api.technodom.kz/f3/api/v1/images/' + image),
          ],
          brand: { connect: { id: phone.brandId } },
          categories: { connect: [{ id: 1 }, { id: 4 }, { id: 19 }, { id: phone.categoryId }] },
        },
      });
    }),
  );

  console.log('up');
}

async function down() {
  // await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;

  console.log('down');
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
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
