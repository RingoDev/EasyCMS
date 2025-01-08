import React from "react";
import Line from "../components/Line.tsx";
import { MinusButton } from "../components/Button/Button.tsx";
import { ComponentParams } from "./Wrapper.tsx";
import { CuisineType } from "../EasyCMS.tsx";

const Cuisine = ({ data, setData, slug }: ComponentParams<CuisineType>) => {
  const addTopic = () => {
    const newTopics = data.menu.slice();
    newTopics.push({ name: "", dishes: [] });
    setData({ ...data, menu: newTopics });
  };
  return (
    <div className="Küche">
      <div style={{ position: "relative" }}>
        <Line>
          <p>Überschrift</p>
          <input
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
          />
        </Line>
        {data.menu.map((topic, topicIndex, topics) => {
          const setTopic = (topic: {
            dishes: {
              name: string;
              allergens: string[];
              price: number;
              vegetarian?: boolean;
            }[];
            name: string;
          }) => {
            const newTopics = topics.slice();
            newTopics[topicIndex] = topic;
            setData({ ...data, menu: newTopics });
          };

          const addDish = () => {
            const newDishes = topics[topicIndex].dishes.slice();
            newDishes.push({ name: "", price: 0, allergens: [] });
            setTopic({ ...topic, dishes: newDishes });
          };

          const removeTopic = () => {
            if (topic.dishes.length === 0) {
              const newTopics = topics.slice();
              newTopics.splice(topicIndex, 1);
              setData({ ...data, menu: newTopics });
            } else {
              // todo if topic is not empty, trigger warning dialog
              // otherwise we are risking to delete a lot of data
              console.log("not deleting topic because it has menu items in it");
            }
          };

          return (
            <div key={topicIndex}>
              <Topic
                topic={topic}
                addDish={addDish}
                removeTopic={removeTopic}
                setTopic={setTopic}
              />
            </div>
          );
        })}
        <Line>
          <></>
          <button onClick={addTopic}>Kategorie Hinzufügen</button>
        </Line>
      </div>
    </div>
  );
};

interface TopicProps {
  removeTopic: () => void;
  topic: {
    dishes: {
      name: string;
      allergens: string[];
      price: number;
      vegetarian?: boolean;
    }[];
    name: string;
  };
  setTopic: (topic: {
    dishes: {
      name: string;
      allergens: string[];
      price: number;
      vegetarian?: boolean;
    }[];
    name: string;
  }) => void;
  addDish: () => void;
}

const Topic: React.FC<TopicProps> = ({
  topic,
  setTopic,
  removeTopic,
  addDish,
}) => {
  return (
    <>
      <Line inset={1}>
        <p>Kategorie Essen</p>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <input
            value={topic.name}
            onChange={(e) => setTopic({ ...topic, name: e.target.value })}
          />
          <MinusButton onClick={removeTopic} />
        </div>
      </Line>
      {topic.dishes.map((dish, dishIndex) => {
        const setDish = (dish: {
          name: string;
          allergens: string[];
          price: number;
          vegetarian?: boolean;
        }) => {
          const newDishes = topic.dishes.slice();
          newDishes[dishIndex] = dish;
          setTopic({ ...topic, dishes: newDishes });
        };

        const removeDish = () => {
          const newDishes = topic.dishes.slice();
          // removes 1 item in array starting from index
          newDishes.splice(dishIndex, 1);
          setTopic({ ...topic, dishes: newDishes });
        };
        return (
          <div key={dishIndex}>
            <Line inset={2}>
              <p>Gericht</p>
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <div style={{ width: "100%" }}>
                  <input
                    value={dish.name}
                    onChange={(e) =>
                      setDish({
                        ...dish,
                        name: e.target.value,
                      })
                    }
                  />
                  <div style={{ display: "flex" }}>
                    {/*<Allergens setDish={setDish} dish={dish}/>*/}
                    <input
                      value={dish.price}
                      type={"number"}
                      onChange={(e) =>
                        setDish({
                          ...dish,
                          price: Math.round(Number(e.target.value) * 100) / 100,
                        })
                      }
                    />
                  </div>
                </div>
                <MinusButton onClick={removeDish} />
              </div>
            </Line>
          </div>
        );
      })}
      <Line>
        <></>
        <button onClick={addDish}>Gericht Hinzufügen</button>
      </Line>
    </>
  );
};

// interface AllergenProps {
//     dish: any
//     setDish: (_: any) => void
// }
//
// const Allergens: React.FC<AllergenProps> = ({dish, setDish}) => {
//
//     return useMemo(() => {
//         return (
//             <>
//                 {["A", "B", "C", "D", "G", "H", "L"].map((allergen, index) => {
//                     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//                         let newAllergens: string[]
//                         if (e.target.checked) {
//                             newAllergens = dish.allergens.slice()
//                             newAllergens.push(allergen)
//                         } else {
//                             // remove from allergens
//                             newAllergens = dish.allergens.filter((a: string) => a !== allergen)
//                         }
//                         setDish({...dish, allergens: newAllergens})
//                     }
//                     return (
//                         <div key={index}>
//                             <FormGroup>
//                                 <FormControlLabel
//                                     control={<Checkbox checked={dish.allergens.includes(allergen)}
//                                                        onChange={handleChange}
//                                                        name="checkedA"/>}
//                                     label={allergen}/>
//                             </FormGroup>
//                         </div>
//                     )
//                 })}
//             </>
//         )
//     }, [dish, setDish])
//
// }

export default Cuisine;
