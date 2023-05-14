import styled from "styled-components";
import FormGroup from "./components/FormGroup/FormGroup";
import Check from "./components/Check/Check";
import { uniqueId } from "lodash";
import React from "react";
import useHighlighting from "../../Highlighting/useHighlighting";

const Options = styled.div`
    display: flex;
    flex-direction: row;
`;

const Modes = () => {
    const { updateConfig, config } = useHighlighting();

    return (
        <Options>
            {
                Object.keys(config).map((configKey) => (
                    <FormGroup
                    key={`fg-${uniqueId(configKey)}`}>
                        <Check
                            key={uniqueId(configKey)}
                            displayValue={configKey}
                            value={configKey}
                            isChecked={config[configKey as keyof typeof config]}
                            id={configKey}
                            name={configKey}
                            onChange={({ id, checked }) => {
                                updateConfig({
                                    ...config,
                                    [id]: checked,
                                })
                            }}
                        />
                    </FormGroup>
                ))
            }
        </Options>
    )
};

export default Modes;