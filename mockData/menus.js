var menus = [];

var dishes = [
	"짜장면",
	"카레덥밥",
	"토스트",
	"치즈버거",
	"새우튀김",
	"육개장",
	"김치찌개",
	"된장찌게",
	"소고기김밥",
	"불고기",
	"갈비",
	"물냉면",
	"비빔냉면",
	"회냉면",
	"갈비탕",
	"설렁탕",
	"도가니탕"
];

var sides = [
	"나박김치",
	"동치미",
	"콜라",
	"우유",
	"감자조림",
	"멸치조림",
	"베이컨구이",
	"오이지",
	"감자튀김",
	"깍두기",
	"계란후라이",
	"왕만두",
	"물만두",
	"사이다",
	"바닐라아이스크림",
	"초코아이스크림"
];

for (var i = 1; i <= 100; i++) {
	var dish = dishes[Math.floor(Math.random() * dishes.length)];
	var side = sides[Math.floor(Math.random() * sides.length)];
	menus.push({
		id: i,
		content: dish + ", " + side
	});
}

module.exports = menus;