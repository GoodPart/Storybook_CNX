
import { Button } from "../../Button";
import Input from "../../Input/Input";

import { searchCss } from "./search.css";

export default function Search() {
    return (
        <div className={searchCss}>
            <Input type="text" size="s" placeholder="Search"/><Button label="검색" primary />
        </div>
    )
}