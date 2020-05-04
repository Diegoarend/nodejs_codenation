const data= require('./data/products.json')
const products = data.products

function filterProducts(ids, products) {
    return products.filter((product) => {
      return ids.includes(product.id);
    });
  };

function getValues(ProductsList){
return ProductsList.map((product)=>{
    return {
    name: product.name,
    category: product.category
    };
});
};

function Getpromo(Values){
let Category=Values.map((value)=>{return value.category})
let uniqueProducts = Category.filter( function( elem, i, Category ) {return Category.indexOf( elem ) === i;});
let PromotionLength = uniqueProducts.length
function switchPromo(PromotionLength){   
    switch(PromotionLength){   
        case 1: return "SINGLE LOOK";
        case 2: return "DOUBLE LOOK";
        case 3: return "TRIPLE LOOK";
        case 4: return "FULL LOOK";
        default: return "ERROR";      
    }
};
return switchPromo(PromotionLength)
};




function getPrices(ProductsList, PromotionSelected) {
const sum = (x, y) => x + y;
let totalRegularPrice =  ProductsList.map((product) => {
    return product.regularPrice;
    }).reduce(sum, 0).toFixed(2);

let totalpromotionPrice = ProductsList.map((product) => {
    let promotionPrice = product.promotions.filter((promo) => {  
        return promo.looks.includes(PromotionSelected);
    });
    if (promotionPrice[0]) {
        promotionPrice = promotionPrice[0].price;
    } else {
        promotionPrice = product.regularPrice;
    }
    return promotionPrice;
    }).reduce(sum, 0)
    .toFixed(2);

let discountValue = (totalRegularPrice - totalpromotionPrice).toFixed(2);

let discount = (100*(discountValue/totalRegularPrice)).toFixed(2);
return {
    totalpromotionPrice,
    discountValue,
    discount,
};
};


function getShoppingCart(ids,produtos){
    let ProductsList=filterProducts(ids,produtos)
    let products=getValues(ProductsList)
    let promotion= Getpromo(products)
    let Prices = getPrices(ProductsList, promotion)
    let totalPrice = Prices.totalpromotionPrice
    let discountValue = Prices.discountValue
    let discount = `${Prices.discount}%`
    return {
        products,
        promotion,
        totalPrice,
        discountValue,
        discount
    }
}

/*
const exemplo1Mock = {
	products: [
		{ name: 'DISNEY CRUELLA© T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'KNIT JOGGING PANTS', category: 'PANTS' },
		{ name: 'ASYMMETRICAL LEATHER SLIDE HEELS', category: 'SHOES' },
		{ name: 'SOFT FLAP BACKPACK', category: 'BAGS' }
	],
	promotion: 'FULL LOOK',
	totalPrice: '404.96',
	discountValue: '75.00',
	discount: '15.63%'
};
const exemplo2Mock = {
	products: [
		{ name: 'RUBBERIZED PRINTED T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'CONTRAST SLOGAN T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'KNIT JOGGING PANTS', category: 'PANTS' },
		{ name: 'MENSWEAR PANTS', category: 'PANTS' }
	],
		promotion: 'DOUBLE LOOK',
	totalPrice: '504.95',
	discountValue: '25.00',
	discount: '4.72%'
};

*/



module.exports = { getShoppingCart };
