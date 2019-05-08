import Home from "../src/components/Home";
import NewItem from "../src/components/NewItem"

export default [
  {
    ...Home,
    path: '/',
    exact: true
  },
  {
    ...NewItem,
    path: '/addnewitem',
    exact: true
  }
]