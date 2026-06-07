// =========================
// Baking Essentials
// =========================

const bakingProducts = [
    {
        name: 'Bakers Flour',
        description: 'Bakers flour is generally any white flour that is >10% protein. I use Wholegrain Milling Co Organic Premium White Bakers Flour as a base for all my loaves.',
        image: 'assets/flour.jpg',
        url: 'https://amzn.to/42Ulfcz'
    },
    {
        name: 'Focaccia Pan',
        description: 'You can use nonstick but from my experience, they scratch easily when removing the focaccia which leads to harmful chemicals leaching into your food. Seasoned aluminium is naturally nonstick, non-toxic and more durable.',
        image: 'assets/focpan.jpg',
        url: 'https://amzn.to/4vaKW4z',
        badge: "Won't give you cancer"
    },
    {
        name: 'Bread Oven',
        description: 'Casual baking I would priorities a regular dutch oven. Really committing to the craft, this is perfect for achieving that authentic bakery-style bake at home.',
        image: 'assets/breadoven.jpg',
        url: 'https://amzn.to/4nUJWza',
        badge: "Commitment"
    },
    {
        name: 'Bench Scraper',
        description: 'An essential tool for shaping and handling dough as well as cleaning your work surface.',
        image: 'assets/benchscraper.jpg',
        url: 'https://amzn.to/4wTXMFZ',
        badge: "Essentials"
    },
    {
        name: 'Dough Whisk',
        description: '"Overrated" until your hands are covered in dough or you try to clean a traditional whisk. Trust me on this one.',
        image: 'assets/doughwhisk.jpg',
        url: 'https://amzn.to/49WZtsp',
        badge: "Game Changer"
    },
    {
        name: 'Traditional Bread Lame',
        description: 'A classic tool for scoring bread before baking.',
        image: 'assets/lame.jpg',
        url: 'https://amzn.to/3RA9tS7'
    },
    {
        name: 'Circular Bread Lame',
        description: 'A modern design that allows more control and precision when scoring intricate designs.',
        image: 'assets/circlame.jpg',
        url: 'https://amzn.to/3RBDOQg'
    },
    {
        name: 'Chainmail',
        description: 'A durable and effective tool for cleaning dried dough from jars and containers.',
        image: 'assets/chainmail.jpg',
        url: 'https://amzn.to/4uzeKYG'
    },
    {
        name: 'Bread Knife',
        description: 'This will genuinely be the only bread knife you will need for the rest of your life for $30.',
        image: 'assets/breadknife.jpg',
        url: 'https://amzn.to/4uQhilu',
        badge: "Essentials"
    },
    {
        name: 'Thermometer',
        description: 'Good insurance to ensure your bread is fully baked through. I find this more useful for enriched breads.',
        image: 'assets/thermometer.jpg',
        url: 'https://amzn.to/4x7MNcf',
        badge: "I'm insecure."
    }


];

// =========================
// Fermentation & Proofing
// =========================

const fermentationProducts = [
    {
        name: 'Fermentation Station Temp Control',
        description: 'Maintain consistent temperature for optimal fermentation.',
        image: 'assets/tempcontrol.jpg',
        url: 'https://amzn.to/49WZg8B'
    },
    {
        name: 'Heating Mat',
        description: 'Provides consistent heat for fermentation. Place beneath your proofing setup rather than directly under the dough.',
        image: 'assets/heatmat.jpg',
        url: 'https://amzn.to/4dySF6B'
    },
    {
        name: 'Silicone Bannetons',
        description: 'Non-stick, dishwasher-safe and resistant to mould. These became my permanent replacement for traditional bannetons. For larger loaves, I recommend Bread Basket Company bannetons.',
        image: 'assets/banneton.jpg',
        url: 'https://amzn.to/4e5MPcZ'
    }
];

// =========================
// Render Function
// =========================

function renderAffiliateProducts(products, containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="product-card">

            <div class="affiliate-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}

            <div class="product-info">

                <div class="product-text">
                    <div class="product-name">${product.name}</div>
                </div>

                <a
                    class="affiliate-btn"
                    href="${product.url}"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                >
                    View
                </a>

            </div>

            <div class="product-popup">
                ${product.description}
            </div>

        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderAffiliateProducts(bakingProducts, 'baking-grid');
    renderAffiliateProducts(fermentationProducts, 'fermentation-grid');
});