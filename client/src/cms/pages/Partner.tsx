import React from "react";
import Line from "../components/Line.tsx";
import { MinusButton } from "../components/Button/Button.tsx";
import { ComponentParams } from "./Wrapper.tsx";
import { CuisineType, PartnerType } from "../EasyCMS.tsx";

function Partner({ data, setData }: ComponentParams<PartnerType>) {
  const addCategory = () => {
    const newCategories = data.categories.slice();
    newCategories.push({ name: "", partners: [] });
    setData({ ...data, categories: newCategories });
  };
  return (
    <div className="Partner">
      <div style={{ position: "relative" }}>
        <Line>
          <p>Überschrift</p>
          <input
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
          />
        </Line>
        {data.categories.map((category, categoryIndex) => {
          const setCategory = (newCategory: any) => {
            const newCategories = data.categories.slice();
            newCategories[categoryIndex] = newCategory;
            setData({ ...data, categories: newCategories });
          };

          const addPartner = () => {
            const newPartners = category.partners.slice();
            newPartners.push({ name: "", address: "" });
            setCategory({ ...category, partners: newPartners });
          };

          const removeCategory = () => {
            const newCategories = data.categories.slice();
            newCategories.splice(categoryIndex, 1);
            setData({ ...data, categories: newCategories });
          };

          return (
            <div key={categoryIndex}>
              <Line>
                <p>Kategorie</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <input
                    value={category.name}
                    onChange={(e) =>
                      setCategory({ ...category, name: e.target.value })
                    }
                  />
                  <MinusButton onClick={removeCategory} />
                </div>
              </Line>
              {category.partners.map((partner, partnerIndex) => {
                const setPartner = (newPartner: any) => {
                  const newPartners = category.partners.slice();
                  newPartners[partnerIndex] = newPartner;
                  setCategory({ ...category, partners: newPartners });
                };

                const removePartner = () => {
                  const newPartners = category.partners.slice();
                  newPartners.splice(partnerIndex, 1);
                  setCategory({ ...category, partners: newPartners });
                };
                return (
                  <div key={partnerIndex}>
                    <Line inset={1}>
                      <p>Partner</p>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <input
                            value={partner.name}
                            onChange={(e) =>
                              setPartner({ ...partner, name: e.target.value })
                            }
                          />
                          <input
                            value={partner.address}
                            onChange={(e) =>
                              setPartner({
                                ...partner,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>
                        <MinusButton onClick={removePartner} />
                      </div>
                    </Line>
                  </div>
                );
              })}
              <Line>
                <></>
                <button onClick={addPartner}>Partner Hinzufügen</button>
              </Line>
            </div>
          );
        })}
        <Line>
          <></>
          <button onClick={addCategory}>Kategorie Hinzufügen</button>
        </Line>
      </div>
    </div>
  );
}

export default Partner;
