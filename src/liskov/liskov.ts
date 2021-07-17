type WorkType = "frontend" | "backend" | "others";
type Output = "website" | "webserver";

interface WebDeveloper<T, R> {
  // work: (workType: T) => R;
  work(workType: WorkType): R; // not throw error
}

// Interface 'FrontendDeveloper' incorrectly extends interface 'WebDeveloper'.
interface FrontendDeveloper extends WebDeveloper<WorkType, Output> {
  work: (workType: "frontend") => "website";
}

const cooljay: WebDeveloper<WorkType, Output> = {
  work(workType: WorkType) {
    // doing "frontend" | "backend" | "others" things
    return "website";
  },
};

// The expected type comes from property 'work' which is declared here on type 'WebDeveloper'
const hyeok: WebDeveloper<WorkType, Output> = {
  work(workType: "frontend") {
    // doing only "frontend" things
    return "website";
  },
};

const eunji: FrontendDeveloper = {
  work(workType: "frontend") {
    // doing only "frontend" things
    return "website";
  },
};

const deploy = (website: Output) => console.log(website);

const startProject = (
  developer: WebDeveloper<WorkType, Output>,
  workType: WorkType
): void => {
  const output = developer.work(workType);
  return void deploy("webserver");
};

startProject(cooljay, "frontend");
startProject(cooljay, "backend");
startProject(cooljay, "others");
startProject(hyeok, "backend");
// tsconfig에서 strict mode를 해제하면 에러 x. strict mode를 사용해도 WebDeveloper에서 shorthand 방식으로 함수 타입을 정의하면 에러가 나지 않는다.
startProject(eunji, "backend"); // Argument of type 'FrontendDeveloper' is not assignable to parameter of type 'WebDeveloper'
