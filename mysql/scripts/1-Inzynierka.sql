CREATE USER 'diet_user'@'localhost' IDENTIFIED BY 'your_password';
Grant SELECT, INSERT, UPDATE, DELETE on inzynierka.* to 'diet_user'@'localhost';

insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(1, 500, 12.5, 20, 10, 1, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(2, 800, 20, 30, 40, 1.5, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(3, 400, 8, 30, 40, 2.5, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(4, 550, 9, 30, 40, 3.5, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(5, 700, 10, 30, 40, 4.5, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(6, 450, 8, 30, 40, 4.5, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(7, 280, 4, 30, 40, 1.5, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(8, 860, 21, 30, 40, 1.5, 100);
insert into Macronutrients(id, calories, fats, carbohydrates, proteins, glycemic_index, amount) values(9, 300, 5, 30, 40, 1.5, 100);

insert into Dishes(id, name, description, meal_time, macronutrients_id) values(1, "Jakieś śniadanie", "opis tego śniadania", "Breakfast", 1);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(2, "Jakieś śniadanie 2", "opis tego 2. śniadania", "Breakfast", 4);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(3, "Jakieś śniadanie 3", "opis tego 3. śniadania", "Breakfast", 6);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(4, "Jakiś obiad", "opis obiadu", "Dinner", 2);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(5, "Jakiś obiad 2", "opis 2. obiadu", "Dinner", 8);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(6, "Jakiś obiad 3", "opis 3. obiadu", "Dinner", 5);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(7, "Jakaś kolacja", "opis kolacji", "Supper", 9);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(8, "Jakaś kolacja 2", "opis 2. kolacji", "Supper", 7);
insert into Dishes(id, name, description, meal_time, macronutrients_id) values(9, "Jakaś  kolacja 3", "opis 3. kolacji", "Supper", 3);

insert into Ingredients(id, name) values(1, "Pietruszka");
insert into Ingredients(id, name) values(2, "Marchewka");
insert into Ingredients(id, name) values(3, "Pieprz");
insert into Ingredients(id, name) values(4, "Czosnek");
insert into Ingredients(id, name) values(5, "Cebula");
insert into Ingredients(id, name) values(6, "Mięso wołowe");
insert into Ingredients(id, name) values(7, "Sól");
insert into Ingredients(id, name, macronutrients_id) values(8, "Czekolada", 2);

insert into Diets(id, name, calories) values(1, "Wegetariańska", 1400);
insert into Diets(id, name, calories) values(2, "Wegetariańska", 1600);
insert into Diets(id, name, calories) values(3, "Wegetariańska", 1800);
insert into Diets(id, name, calories) values(4, "Wegetariańska", 2000);
insert into Diets(id, name, calories) values(5, "Zwykła", 1400);
insert into Diets(id, name, calories) values(6, "Zwykła", 1600);
insert into Diets(id, name, calories) values(7, "Zwykła", 1800);
insert into Diets(id, name, calories) values(8, "Zwykła", 2000);