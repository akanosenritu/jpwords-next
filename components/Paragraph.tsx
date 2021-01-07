import React from "react";

export const Paragraph: React.FC = props => {
  return <div style={{paddingLeft: 10}}>
    {props.children}
  </div>
}