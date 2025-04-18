import { Button } from "../../../Atom/Button/variant/Button";
import Input from "../../../Atom/Input/variant/Input";

import { searchCss } from "./search.css";

export default function Search() {
  return (
    <div className={searchCss}>
      <Input type="text" size="s" placeholder="Search" />
      <Button label="검색" primary />
    </div>
  );
}
