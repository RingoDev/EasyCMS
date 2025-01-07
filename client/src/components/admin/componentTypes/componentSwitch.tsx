import {Component, ComponentTypes} from "../../../types/types";
import React from "react";
import CreateContainer from "./create-container";
import CreateMultilineText from "./create-multilineText";
import CreateSinglelineText from "./create-singlelineText";
import CreateNumberInput from "./create-numberInput";
import CreateCheckbox from "./create-checkbox";

interface ComponentProps {
    type: ComponentTypes
    addChild: (child: Component) => void
    name:string
}

const ComponentSwitch: React.FC<ComponentProps> = (props) => {


    switch (props.type) {
        case ComponentTypes.Container:
            return <CreateContainer addChild={props.addChild}/>
        case ComponentTypes.SinglelineText:
            return <CreateSinglelineText addChild={props.addChild}/>
        case ComponentTypes.MultilineText:
            return <CreateMultilineText name={props.name} addChild={props.addChild}/>
        case ComponentTypes.Checkbox:
            return <CreateCheckbox addChild={props.addChild}/>
        case ComponentTypes.NumberInput:
            return <CreateNumberInput addChild={props.addChild}/>
    }
}

export default ComponentSwitch