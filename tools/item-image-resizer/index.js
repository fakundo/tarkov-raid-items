const sharp = require('sharp')

const src = process.argv[2]
const out = process.argv[3]

const SINGLE_SLOT_SIZE = 64
const OUTPUT_SIZE = 64
const OUTPUT_SINGLE_SLOT_SIZE = 40

const processSingleSlotItemImage = async (img) => {
  const extendSize = (OUTPUT_SIZE - OUTPUT_SINGLE_SLOT_SIZE) / 2
  img.resize(OUTPUT_SINGLE_SLOT_SIZE)
  img.extend({
    top: extendSize,
    right: extendSize,
    bottom: extendSize,
    left: extendSize,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
}

const processMultiSlotItemImage = async (img) => {
  img.resize({
    width: OUTPUT_SIZE,
    height: OUTPUT_SIZE,
    fit: sharp.fit.contain,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
}

const run = async () => {
  const img = sharp(src)
  const { width, height } = await img.metadata()

  if (width <= SINGLE_SLOT_SIZE && height <= SINGLE_SLOT_SIZE) {
    await processSingleSlotItemImage(img)
  } else {
    await processMultiSlotItemImage(img)
  }

  img.toFile(out)
}

run()
