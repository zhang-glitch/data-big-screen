

export default function formatterNumber(val) {
  if (val.length <= 3) {
    return val
  } else {
    const reg = /(?=\B(\d{3})+$)/g
    return val.replace(reg, ',');
  }
}




