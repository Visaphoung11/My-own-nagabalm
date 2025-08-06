import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Create Categories
  console.log('📂 Creating categories...')
  
  const balmsCategory = await prisma.category.create({
    data: {
      slug: 'balms',
      translations: {
        en: {
          name: 'Balms'
        },
        km: {
          name: 'ក្រែម'
        }
      }
    }
  })

  const oilsCategory = await prisma.category.create({
    data: {
      slug: 'oils',
      translations: {
        en: {
          name: 'Oils'
        },
        km: {
          name: 'ប្រេង'
        }
      }
    }
  })

  const spraysCategory = await prisma.category.create({
    data: {
      slug: 'sprays',
      translations: {
        en: {
          name: 'Sprays'
        },
        km: {
          name: 'ស្ព្រេ'
        }
      }
    }
  })

  const inhalersCategory = await prisma.category.create({
    data: {
      slug: 'inhalers',
      translations: {
        en: {
          name: 'Inhalers'
        },
        km: {
          name: 'ឧបករណ៍ដកដង្ហើម'
        }
      }
    }
  })

  console.log('✅ Categories created successfully!')

  // Create Products
  console.log('🛍️ Creating products...')

  // Balm Products
  await prisma.product.create({
    data: {
      slug: 'naga-balm-original',
      image: '/images/Images for NB/Naga-Balm-Original.jpg',
      price: 2.50,
      isTopSell: true,
      translations: {
        en: {
          name: 'Naga Balm Original',
          description: 'Traditional herbal balm for muscle relief and pain management. Made with natural ingredients following ancient Khmer recipes.'
        },
        km: {
          name: 'នាគបាម ដើម',
          description: 'ក្រែមឱសធបុរាណសម្រាប់បំបាត់ការឈឺចាប់និងសម្រាកសាច់ដុំ។ ផលិតពីគ្រឿងផ្សំធម្មជាតិតាមរូបមន្តបុរាណខ្មែរ។'
        }
      },
      categoryId: balmsCategory.id
    }
  })

  await prisma.product.create({
    data: {
      slug: 'naga-balm-fire',
      image: '/images/Images for NB/Naga-Balm-Fire.jpg',
      price: 2.75,
      isTopSell: true,
      translations: {
        en: {
          name: 'Naga Balm Fire',
          description: 'Extra strength warming balm for deep muscle relief. Perfect for athletes and active individuals.'
        },
        km: {
          name: 'នាគបាម ភ្លើង',
          description: 'ក្រែមកម្តៅខ្លាំងសម្រាប់បំបាត់ការឈឺចាប់ជ្រៅ។ ល្អសម្រាប់អ្នកកីឡានិងអ្នកសកម្ម។'
        }
      },
      categoryId: balmsCategory.id
    }
  })

  await prisma.product.create({
    data: {
      slug: 'naga-balm-ice',
      image: '/images/Images for NB/Naga-Balm-Ice.jpg',
      price: 2.75,
      isTopSell: false,
      translations: {
        en: {
          name: 'Naga Balm Ice',
          description: 'Cooling balm for instant relief from heat and inflammation. Refreshing menthol formula.'
        },
        km: {
          name: 'នាគបាម ទឹកកក',
          description: 'ក្រែមត្រជាក់សម្រាប់បំបាត់កំដៅនិងការរលាក។ រូបមន្តម៉ិនថលធម្មជាតិ។'
        }
      },
      categoryId: balmsCategory.id
    }
  })

  await prisma.product.create({
    data: {
      slug: 'naga-balm-go',
      image: '/images/Images for NB/Naga-Balm-Go.jpg',
      price: 3.00,
      isTopSell: true,
      translations: {
        en: {
          name: 'Naga Balm Go',
          description: 'Portable balm stick for on-the-go relief. Convenient and mess-free application.'
        },
        km: {
          name: 'នាគបាម ហ្គោ',
          description: 'ក្រែមកាំបិតសម្រាប់ការប្រើប្រាស់ងាយស្រួល។ ការលាបមិនរញ៉េរញ៉ៃ។'
        }
      },
      categoryId: balmsCategory.id
    }
  })

  // Oil Products
  await prisma.product.create({
    data: {
      slug: 'liniment-oil-energizing',
      image: '/images/Images for NB/Leniment-Oil-Energizing.jpg',
      price: 4.50,
      isTopSell: false,
      translations: {
        en: {
          name: 'Liniment Oil Energizing',
          description: 'Energizing massage oil to boost circulation and vitality. Perfect for pre-workout preparation.'
        },
        km: {
          name: 'ប្រេងម៉ាស្សាស ថាមពល',
          description: 'ប្រេងម៉ាស្សាសបង្កើនថាមពលដើម្បីជំរុញចលនាឈាមនិងភាពរស់រវើក។ ល្អសម្រាប់រៀបចំមុនហាត់ប្រាណ។'
        }
      },
      categoryId: oilsCategory.id
    }
  })

  await prisma.product.create({
    data: {
      slug: 'liniment-oil-extreme',
      image: '/images/Images for NB/Leniment-Oil-Extreme.jpg',
      price: 5.00,
      isTopSell: false,
      translations: {
        en: {
          name: 'Liniment Oil Extreme',
          description: 'Maximum strength massage oil for severe muscle tension and deep tissue relief.'
        },
        km: {
          name: 'ប្រេងម៉ាស្សាស ខ្លាំង',
          description: 'ប្រេងម៉ាស្សាសកម្រិតខ្ពស់សម្រាប់ការតានតឹងសាច់ដុំធ្ងន់ធ្ងរនិងការបំបាត់ការឈឺចាប់ជ្រៅ។'
        }
      },
      categoryId: oilsCategory.id
    }
  })

  // Spray Products
  await prisma.product.create({
    data: {
      slug: 'energizing-spray',
      image: '/images/Images for NB/Energizing-Spray.jpg',
      price: 3.75,
      isTopSell: false,
      translations: {
        en: {
          name: 'Energizing Spray',
          description: 'Quick-acting spray for instant energy boost and muscle activation. Easy to apply anywhere.'
        },
        km: {
          name: 'ស្ព្រេថាមពល',
          description: 'ស្ព្រេប្រើប្រាស់រហ័សសម្រាប់បង្កើនថាមពលភ្លាមៗនិងធ្វើឱ្យសាច់ដុំសកម្ម។ ងាយស្រួលប្រើគ្រប់ទីកន្លែង។'
        }
      },
      categoryId: spraysCategory.id
    }
  })

  await prisma.product.create({
    data: {
      slug: 'mosquito-repellent',
      image: '/images/Images for NB/NagaBalm-MosquitoRepellent.jpg',
      price: 3.25,
      isTopSell: false,
      translations: {
        en: {
          name: 'Mosquito Repellent',
          description: 'Natural mosquito repellent spray with herbal ingredients. Safe and effective protection.'
        },
        km: {
          name: 'ថ្នាំបណ្តេញមូស',
          description: 'ស្ព្រេបណ្តេញមូសធម្មជាតិដែលមានគ្រឿងផ្សំឱសថ។ ការការពារមានសុវត្ថិភាពនិងមានប្រសិទ្ធភាព។'
        }
      },
      categoryId: spraysCategory.id
    }
  })

  // Inhaler Products
  await prisma.product.create({
    data: {
      slug: 'roll-on-inhaler',
      image: '/images/Images for NB/RollOn.jpg',
      price: 2.25,
      isTopSell: false,
      translations: {
        en: {
          name: 'Roll-On Inhaler',
          description: 'Convenient roll-on inhaler for respiratory relief and aromatherapy benefits.'
        },
        km: {
          name: 'ឧបករណ៍ដកដង្ហើមរំកិល',
          description: 'ឧបករណ៍ដកដង្ហើមរំកិលងាយស្រួលសម្រាប់បំបាត់ការលំបាកដកដង្ហើមនិងអត្ថប្រយោជន៍ក្លិនអរូម៉ា។'
        }
      },
      categoryId: inhalersCategory.id
    }
  })

  console.log('✅ Products created successfully!')
  console.log('🎉 Database seeding completed!')
  
  // Display summary
  const categoryCount = await prisma.category.count()
  const productCount = await prisma.product.count()
  
  console.log(`📊 Summary:`)
  console.log(`   Categories: ${categoryCount}`)
  console.log(`   Products: ${productCount}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
