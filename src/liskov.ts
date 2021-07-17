type WEB_PART = "frontend" | "backend" | "others";

/**
 * TRY: 바꿔서 시도해보세요
 */
interface WebDeveloper {
  work: (part: WEB_PART) => "something good" | "something bad";
  // work(part: WEB_PART): "something good" | "something bad"; // not throw error
}

// Interface 'FrontendDeveloper' incorrectly extends interface 'WebDeveloper'.
interface FrontendDeveloper extends WebDeveloper {
  work: (part: "frontend") => "something good";
}

const cooljay: WebDeveloper = {
  work(part: WEB_PART) {
    // doing "frontend" | "backend" | "others" things
    return "something good";
  },
};

// The expected type comes from property 'work' which is declared here on type 'WebDeveloper'
const hyeok: WebDeveloper = {
  work(part: "frontend") {
    // doing only "frontend" things
    return "something good";
  },
};

const eunji: FrontendDeveloper = {
  work(part: "frontend") {
    // doing only "frontend" things
    return "something good";
  },
};

const startProject = (developer: WebDeveloper, part: WEB_PART) => {
  developer.work(part);
};

startProject(cooljay, "frontend");
startProject(cooljay, "backend");
startProject(cooljay, "others");
startProject(hyeok, "backend");
// tsconfig에서 strict mode를 해제하면 에러 x. strict mode를 사용해도 WebDeveloper에서 shorthand 방식으로 함수 타입을 정의하면 에러가 나지 않는다.
startProject(eunji, "backend"); // Argument of type 'FrontendDeveloper' is not assignable to parameter of type 'WebDeveloper'
