import Home from "../src/components/Home";
import NewItem from "../src/components/NewItem"

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/addnewitem',
    component: NewItem,
    exact: true
  }
]