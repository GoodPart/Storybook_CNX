import Button from "../../../Atom/Button/variant/Button";
import Input from "../../../Atom/Input/variant/Input";

import { searchCss } from "./search.css";

export default function Search() {
  return (
    <div className={searchCss}>
      <Input type="text" size="m" placeholder="Search" />
      <Button variant="primary" size="l">검색</Button>
    </div>
  );
}
