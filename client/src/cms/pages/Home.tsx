import React from "react";
import ImageUpload from "../components/imageUpload.tsx";
import Line from "../components/Line.tsx";
import Gallery from "../components/Gallery/Gallery.tsx";
import { HomeType } from "../EasyCMS.tsx";
import { ComponentParams } from "./Wrapper.tsx";

const Home = ({ data, setData }: ComponentParams<HomeType>) => {
  return (
    <div className="Home">
      <div style={{ position: "relative" }}>
        <Info data={data} setData={setData} />

        <Line>
          <p>Titelbild</p>
          <ImageUpload
            slug={"/home"}
            imageData={data.titleImage}
            setImageData={(image) => {
              console.log("setting image path to" + image.src);
              setData({
                ...data,
                titleImage: {
                  ...data.titleImage,
                  ...(image as any),
                },
              });
            }}
          />
        </Line>
        <Line>
          <p>Überschrift Begrüßung</p>
          <input
            value={data.greetingHeading}
            onChange={(e) =>
              setData({ ...data, greetingHeading: e.target.value })
            }
          />
        </Line>

        <Line>
          <p>Familie</p>
          <ImageUpload
            slug={"/home"}
            imageData={data.familyPicture}
            setImageData={(image) => {
              console.log("setting image data to", image);
              setData({
                ...data,
                familyPicture: { ...data.familyPicture, ...image },
              });
            }}
          />
        </Line>
        <Line>
          <p>Begrüßungstext</p>
          <textarea
            value={data.greeting}
            onChange={(e) => setData({ ...data, greeting: e.target.value })}
          />
        </Line>
        <Line>
          <p>Überschrift Öffnungszeiten</p>
          <input
            value={data.openingHoursHeading}
            onChange={(e) =>
              setData({ ...data, openingHoursHeading: e.target.value })
            }
          />
        </Line>
        <Line>
          <p>Öffnungszeiten Text</p>
          <textarea
            value={data.openingHoursText}
            onChange={(e) =>
              setData({ ...data, openingHoursText: e.target.value })
            }
          />
        </Line>
        <Line>
          <p>Gallery</p>
          <Gallery
            slug={"/home"}
            images={data.gallery}
            setImages={(images) => setData({ ...data, gallery: images })}
          />
        </Line>
      </div>
    </div>
  );
};

interface InfoProps {
  data: any;
  setData: (a: any) => void;
}

const Info = ({ data, setData }: InfoProps) => {
  return (
    <>
      <Line>
        <p>Info</p>
        <button
          onClick={() =>
            setData({
              ...data,
              showInfo: !data.showInfo,
            })
          }
        >
          {" "}
          {data.showInfo ? "Verstecken" : "Anzeigen"}
        </button>
      </Line>
      {data.showInfo ? (
        <>
          <Line>
            <p>Überschrift Info</p>
            <input
              value={data.infoTitle}
              onChange={(e) =>
                setData({
                  ...data,
                  infoTitle: e.target.value,
                })
              }
            />
          </Line>
          <Line>
            <p>InfoText</p>
            <textarea
              value={data.infoText}
              onChange={(e) => setData({ ...data, infoText: e.target.value })}
            />
          </Line>

          {/*<CurrentMenu currentMenu={data.currentMenu}*/}
          {/*             setCurrentMenu={(currentMenu: any) => setData({...data, currentMenu})}/>*/}
        </>
      ) : null}
    </>
  );
};

// interface MenuProps {
//     currentMenu: any,
//     setCurrentMenu: any
// }

// const CurrentMenu = ({currentMenu, setCurrentMenu}: MenuProps) => {
//
//     // changes the dish on a certain index and calls setCurrentMenu with it
//     const handleChange = (dish: any, index: number) => {
//         const newDishes = currentMenu.dishes.slice()
//         newDishes[index] = dish
//         setCurrentMenu({...currentMenu, dishes: newDishes})
//     }
//
//     const remove = (index: number) => {
//         const newDishes = currentMenu.dishes.slice()
//         newDishes.splice(index, 1)
//         setCurrentMenu({...currentMenu, dishes: newDishes})
//     }
//
//     const add = () => {
//         const newDishes = currentMenu.dishes.slice()
//         newDishes.push({name: "", price: 0, allergens: []})
//         setCurrentMenu({...currentMenu, dishes: newDishes})
//     }
//
//     return (
//         <>
//             {currentMenu.dishes.map((dish: any, index: number) => (
//                 <div key={index}>
//                     <Line>
//                         <p>Gericht</p>
//                         <div style={{display: "flex", width: "100%", alignItems: "center"}}>
//                             <input value={dish.name}
//                                    onChange={(e) => handleChange({...dish, name: e.target.value}, index)}/>
//
//                             <input style={{flex: "0 0 15%", marginLeft: "1rem"}} value={dish.price} type={"number"}
//                                    onChange={(e) => handleChange({
//                                        ...dish,
//                                        price: Math.round(Number(e.target.value) * 100) / 100
//                                    }, index)}/>
//                             <MinusButton onClick={() => remove(index)}/>
//                         </div>
//                     </Line>
//                 </div>
//             ))}
//             <Line><PlusButton onClick={() => add()}/></Line>
//         </>
//     )
// }
export default Home;
