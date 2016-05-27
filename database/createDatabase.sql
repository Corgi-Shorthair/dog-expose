DROP TABLE IF EXISTS ImgFiles;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Dogs;

CREATE TABLE Dogs(
	name VARCHAR(20) PRIMARY KEY,
	description TEXT NOT NULL,
	fullDescription TEXT NOT NULL,
	likes INTEGER NOT NULL,
	size TEXT NOT NULL,
	coat TEXT NOT NULL,
	availability TEXT NOT NULL,
	talents TEXT NOT NULL,
	friendliness TEXT NOT NULL,
	noise TEXT NOT NULL
);

CREATE TABLE Comments(
	author TEXT NOT NULL,
	body TEXT NOT NULL,
	parentDog REFERENCES Dogs(name) NOT NULL,
	PRIMARY KEY(author, body, parentDog)
);

CREATE TABLE ImgFiles(
    imgId INTEGER NOT NULL,
	source TEXT NOT NULL,
	parentDog REFERENCES Dogs(name) NOT NULL,
    PRIMARY KEY(imgId,parentDog)
); 

INSERT INTO Dogs(name,description,fullDescription,likes,size,coat,availability,talents,friendliness,noise) VALUES ("Corgi",
																		   "The Welsh Corgi is a small type of herding dog that originated in Wales.",
																		   	"The Pembroke Welsh Corgi is a cattle herding dog breed which originated in Pembrokeshire, Wales. It is one of two breeds known as a Welsh Corgi. The other is the Cardigan Welsh Corgi and both descend from the line that is the northern spitz-type dog. The Pembroke Welsh Corgi is the younger of the two Corgi breeds and is a separate and distinct breed[3] from the Cardigan. The corgi is one of the smallest dogs in the Herding Group. Pembroke Welsh Corgis are famed for being the preferred breed of Queen Elizabeth II, who has owned more than 30 during her reign. These dogs have been favored by British royalty for more than seventy years.",
																		   	3,
																		   	"Small (9-15 inches, 15-35 pounds)",
																		   	"Medium",
																		   	"Difficult to find",
																		   	"Tracking, herding, watchdog, guarding, and agility",
																		   	"Reserved with strangers",
																		   	"Average barker");
INSERT INTO Dogs(name,description,likes,size,coat,fullDescription,availability,talents,friendliness,noise) VALUES ("Chow chow dog",
		"The Chow Chow is a dog breed originally from northern China, which means puffy-lion dog.",
		2,
		"Medium (12-24 inches, 30-55 pounds)",
		"Fluffy",
		"The Chow Chow is a stocky, broad-headed, powerful dog. It has a square build, and short, compact body. There are two coat types, the more popular rough and the less common smooth coated. The rough coat is thick and stands out from the body; its heavy mane makes the dog look lion-like. The head is large and broad, with a wide muzzle and scowling expression. The eyes are deep set, wide apart, dark, and almond-shaped, and of medium size. The small triangular ears are erect. The bushy tail curls over the back in the manner typical of Spitz breeds. The tongue and mouth are a distinctive blackish color. The coarse double coat comes in five solid colors: red, cream, black, blue, and cinnamon.",
		"Very popular",
		"Watchdog and guarding",
		"Very wary of strangers; highly protective",
		"Likes to bark");
INSERT INTO Dogs(name,description,likes,size,coat,fullDescription,availability,talents,friendliness,noise) VALUES ("Golden retriever",
		"The Golden Retriever is a large-sized breed of dog bred as gun dogs.",
		68,
		"Large (22-27 inches, 50-115 pounds)",
		"Feathered",
		"The Golden Retriever is a beautiful, sturdy, athletic dog with a feathered, medium-length cream to deep golden colored coat. It is slightly longer than tall. The outer coat is water-repellent, and the undercoat is dense. The head is broad and rather rounded, with a well-defined stop and tapering, but wide muzzle. The nose is black, and the kindly eyes are brown with dark rims. The ears are rather short and pendant. The tail is thick, carried near the horizontal. Feet are round.",
		"Very popular",
		"Hunting, tracking, retrieving, narcotics detection, agility, competitive obedience, and performing tricks",
		"Loves everyone",
		"Average barker");
INSERT INTO Dogs(name,description,likes,size,coat,fullDescription,availability,talents,friendliness,noise) VALUES ("Husky",
		"Husky is a general name for a sled-type of dog used in northern regions style.",
		1,
		"Medium (12-24 inches, 30-55 pounds)",
		"Fluffy",
		"The Husky is a beautiful medium-sized Spitz-type breed with blue or brown eyes (or one of each), and triangular, furry, prick ears. His soft, thick double coat protects him from extreme cold, down to minus 58°F (but only if acclimated and for short periods). The furry tail curls over his back when he is running or alert. The Siberian Husky is very agile and moves easily, gracefully, and effortlessly. He should not look heavy. The coat comes in many colors, including various shades of gray, black, sand, and red, usually with white legs, face, and throat. White markings often appear on the head, and some dogs are all white.",
		"Very popular",
		"Sledding, carting, and sled racing",
		"Loves everyone",
		"Likes to howl");
INSERT INTO Dogs(name,description,likes,size,coat,fullDescription,availability,talents,friendliness,noise) VALUES ("Samoyed",
		"The Samoyed is a breed of dog that takes its name from the Samoyedic peoples of Siberia.",
		108,
		"Medium (12-24 inches, 30-55 pounds)",
		"Fluffy",
		"The Samoyed is a lively, powerful Arctic dog with a broad wedge-shaped head. The body is just slightly longer than tall, with a typical Spitz build. The long fluffy tail is carried in the characteristic Spitz curl over the back. Built for endurance, this dog’s the chest is deep and the hindquarters well muscled. The eyes and nose are dark, and the erect ears are triangular with a rounded tip. The dark lips should curve upward in a characteristic smile. The large feet are covered with hair for protection from the Arctic's extreme temperatures. The very thick double coat is white, with pure white preferred, though cream and biscuit colors are accepted. The coat has a lovely silvery sheen. The fur is so weather resistant that Samoyed people made clothes out of it.",
		"Might take some effort to find",
		"Herding, watchdog, sledding, and carting",
		"Reserved with strangers",
		"Likes to bark");
INSERT INTO Dogs(name,description,likes,size,coat,fullDescription,availability,talents,friendliness,noise) VALUES ("Teddy bear poodle",
		"Teddy Bear Faced Poodles will look like puppies forever with adorable fuzzy face.",
		50,
		"Very small (< 10 inches, < 15 pounds)",
		"Curly",
		"The Teddy Bear Poodle is an elegant, lively, small dog with a profuse, but well-groomed and clipped curly coat. The ears are long, flat, and wide, lying close to the head. The head is long. The dark, almond-shaped eyes have an alert expression. The skull is a bit rounded, with a slight stop. The teeth should form a scissors bite. A good Poodle has a square silhouette, with approximately the same overall length as the height at the withers. The level topline has a slight depression behind the withers. The feet are small, oval, and webbed, with arched toes. Dewclaws generally are removed. The tail is docked to produce a balanced dog. The coat may be groomed into three basic styles: the pet clip (or puppy clip) with relatively short hair all over the body, the English saddle clip, and the Continental clip. In the latter, the rear half of the body is shaved, and bracelets are left around the ankles and pom-poms on the tails and hips. All solid colors are permissible. The Poodle has a delightful springy gait.",
		"Very popular",
		"Watchdog, agility, competitive obedience, and performing tricks",
		"Reserved with strangers",
		"Likes to bark");

INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/corgi/corgi01.jpg","Corgi",1);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/corgi/corgi02.jpg","Corgi",2);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/corgi/corgi03.jpg","Corgi",3);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/corgi/corgi04.jpg","Corgi",4);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/corgi/corgi05.jpg","Corgi",5);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/chowchow/chowchow01.jpg","Chow chow dog",1);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/chowchow/chowchow02.jpg","Chow chow dog",2);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/chowchow/chowchow03.jpg","Chow chow dog",3);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/chowchow/chowchow04.jpg","Chow chow dog",4);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/chowchow/chowchow05.jpg","Chow chow dog",5);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/golden-retriever/golden01.jpg","Golden retriever",1);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/golden-retriever/golden02.jpg","Golden retriever",2);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/golden-retriever/golden03.jpg","Golden retriever",3);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/golden-retriever/golden04.jpg","Golden retriever",4);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/golden-retriever/golden05.jpg","Golden retriever",5);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/husky/husky01.jpg","Husky",1);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/husky/husky02.jpg","Husky",2);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/husky/husky03.jpg","Husky",3);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/husky/husky04.jpg","Husky",4);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/husky/husky05.jpg","Husky",5);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/samoyed/samoyed01.jpg","Samoyed",1);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/samoyed/samoyed02.jpg","Samoyed",2);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/samoyed/samoyed03.jpg","Samoyed",3);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/samoyed/samoyed04.jpg","Samoyed",4);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/samoyed/samoyed05.jpg","Samoyed",5);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/teddy/teddy01.jpg","Teddy bear poodle",1);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/teddy/teddy02.jpg","Teddy bear poodle",2);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/teddy/teddy03.jpg","Teddy bear poodle",3);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/teddy/teddy04.jpg","Teddy bear poodle",4);
INSERT INTO ImgFiles(source,parentDog,imgId) VALUES ("images/teddy/teddy05.jpg","Teddy bear poodle",5);

INSERT INTO Comments(parentDog,author,body) VALUES ("Corgi","emma@dog.com","Really cute dogs! I have a Corgi called Shawn. He is very adorable!");
INSERT INTO Comments(parentDog,author,body) VALUES ("Corgi","david@dog.com","My corgi is really naughty but still he's family :p");
INSERT INTO Comments(parentDog,author,body) VALUES ("Chow chow dog","shawn@dog.com","Chow Chow dogs are very cute and adorable!");
INSERT INTO Comments(parentDog,author,body) VALUES ("Chow chow dog","baby@dog.com","My chowchow is really naughty...");
INSERT INTO Comments(parentDog,author,body) VALUES ("Golden retriever","yl15280@dog.com","They are the smartest dogs!");
INSERT INTO Comments(parentDog,author,body) VALUES ("Golden retriever","tanzhiying@dog.com","My golden retriever is called GG, haha...");
INSERT INTO Comments(parentDog,author,body) VALUES ("Husky","liyang@dog.com","They are naughty boys!");
INSERT INTO Comments(parentDog,author,body) VALUES ("Husky","hi@dog.com","Not as smart as golden retriever...");
INSERT INTO Comments(parentDog,author,body) VALUES ("Samoyed","ian@dog.com","The white coat is so adorable!");
INSERT INTO Comments(parentDog,author,body) VALUES ("Samoyed","simon@dog.com","I like them :)");
INSERT INTO Comments(parentDog,author,body) VALUES ("Teddy bear poodle","huskybaby@dog.com","I think they are all ADHD!");
INSERT INTO Comments(parentDog,author,body) VALUES ("Teddy bear poodle","hey@dog.com","So naughty...");
