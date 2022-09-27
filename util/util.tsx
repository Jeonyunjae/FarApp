export default function textLengthOverCut(txt:string, len:number, lastTxt:string) {
  if (len == 0 || len == null) {
    //기본값
    len = 20;
  }
  if (lastTxt == "" || lastTxt == null) {
    //기본값
    lastTxt = "...";
  }
  if (txt.length > len) {
    txt = txt.substr(0, len) + lastTxt;
  }
  return txt;
}
