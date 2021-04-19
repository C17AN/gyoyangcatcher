// 수강신청 메인 페이지 콘솔창에 코드 복사
const start_time = 095959; // 시, 분, 초 단위 지정

// 수강신청 시작 시간보다 1초 이른 시간으로 설정해주세요.

const subjectNumbers = ["0857", "0446"]; // 신청할 과목번호 입력 (최대 2과목)
let shooter; // setInterval 타이머
let requested = 0; // 신청횟수 카운터

// 서버시간 획득 함수
function serverToday() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("HEAD", "http://su.kau.ac.kr/sugang/main.su", false);
  xmlHttp.setRequestHeader("Content-Type", "text/html");
  xmlHttp.send("");
  ``;
  let st = xmlHttp.getResponseHeader("Date");
  let curDate = new Date(st);
  let hour = curDate.getHours();
  let minutes = curDate.getMinutes();
  let second = curDate.getSeconds();

  if (parseInt(hour) < 10) {
    hour = 0 + "" + hour;
  }
  if (parseInt(minutes) < 10) {
    minutes = 0 + "" + minutes;
  }
  if (parseInt(second) < 10) {
    second = 0 + "" + second;
  }
  let curDateFmt = parseInt(hour + "" + minutes + "" + second);
  return curDateFmt;
}

// 신청 래퍼 함수
function timecheck() {
  // 20회가 넘으면 수강신청 버튼이 막히므로 15회에서 신청을 중단함.
  if (requested == 15) {
    console.log("신청 완료");
    clearInterval(shooter);
    return;
  } else {
    if (serverToday() < start_time) {
      console.clear();
      console.log(start_time - serverToday() + "초 전입니다.");
    } else {
      console.clear();
      shootClient();
      requested += 1;
      console.log(`요청 횟수 : ${requested}회`);
    }
  }
}

// 수강신청 페이지에 요청을 보내는 함수
function shootClient() {
  client0 = new XMLHttpRequest();
  client0.open("POST", "http://su.kau.ac.kr/sugang/culture.su", true);
  client0.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  client0.send(
    `mode=save&gwamok_no=${subjectNumbers[0]}&gwamok_haknyun=&gwamok_ban=X&gwamok_gjungong=A3000&gwamok_ghakbu=&gwamok_isu_gubun=12&gwamok_over_yn=20&gwamok_sugang_jungong=`
  );
  console.log("증권투자의 이해 신청중");

  client0 = new XMLHttpRequest();
  client0.open("POST", "http://su.kau.ac.kr/sugang/culture.su", true);
  client0.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  client0.send(
    `mode=save&gwamok_no=${subjectNumbers[1]}&gwamok_haknyun=&gwamok_ban=X&gwamok_gjungong=A3000&gwamok_ghakbu=&gwamok_isu_gubun=12&gwamok_over_yn=20&gwamok_sugang_jungong=`
  );
  console.log("집단상담 신청중");
}

// 실행 함수
function auto() {
  console.clear();
  // 500은 밀리세컨드 단위로, 500 ~ 1000 사이를 권장
  shooter = setInterval(timecheck, 500);
}

auto();
