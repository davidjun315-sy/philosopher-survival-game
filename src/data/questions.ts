import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    round: 1,
    title: '학교 좀비 아포칼립스',
    category: '생명과 다수의 딜레마',
    scenario: '방과 후 학교에 좀비 떼가 들이닥쳤다! 교실 문을 걸어 잠그고 25명의 학생이 숨죽이고 있는데, 복도에서 피투성이가 된 친구 한 명이 문을 두드리며 "제발 문 좀 열어줘!"라고 울부짖는다. 하지만 문을 여는 순간 좀비들이 들이닥쳐 교실 안 25명 전원이 위험해질 수 있다.',
    options: [
      {
        id: 'r1_opt1',
        text: '한 명을 살리자고 25명 전체를 위험에 빠뜨릴 순 없다. 가슴 찢어지지만 문을 굳게 닫아둔다.',
        weights: { bentham: 5, mill: 3, sophist: 2, kant: -3 },
        traitBonuses: { practical: 5, happiness: 3, duty: -1 }
      },
      {
        id: 'r1_opt2',
        text: '인간의 생명을 숫자로 계산해선 안 된다. 어떤 위험이 따르더라도 즉시 문을 열고 친구를 구한다.',
        weights: { kant: 5, augustine: 3, bentham: -3 },
        traitBonuses: { duty: 5, rational: 3, practical: -1 }
      },
      {
        id: 'r1_opt3',
        text: '문을 열든 닫든 탁상공론은 집어치우고, 창문 로프나 옆 교실 유인 등 제3의 현실적인 탈출 묘수를 당장 실행한다.',
        weights: { dewey: 4, bacon: 4, aristotle: 3 },
        traitBonuses: { practical: 5, empirical: 4 }
      },
      {
        id: 'r1_opt4',
        text: '이 극한의 순간에 누구 탓도 할 수 없다. 오직 나의 양심과 자유의지로 결정하고, 그 어떤 끔찍한 결과도 내가 온전히 책임진다.',
        weights: { sartre: 5, kierkegaard: 4, jaspers: 3 },
        traitBonuses: { freedom: 5, duty: 2 }
      }
    ]
  },
  {
    round: 2,
    title: '비밀 복권 30억 당첨',
    category: '부와 가치관',
    scenario: '아무도 모르게 산 복권이 1등에 당첨되어 내 통장에 30억 원이 입금되었다! 당장 학교를 그만두고 평생 놀고먹을 수도 있는 엄청난 금액이다. 당신이 가장 먼저 취할 행동은?',
    options: [
      {
        id: 'r2_opt1',
        text: '절대 남에게 티 내지 않고 안전한 곳에 묻어둔 뒤, 평소처럼 조용하고 스트레스 없는 평온한 일상을 지킨다.',
        weights: { epicurus: 5, spinoza: 4, stoa: 3 },
        traitBonuses: { happiness: 5, rational: 3 }
      },
      {
        id: 'r2_opt2',
        text: '내가 직접 연구하고 싶었던 실험실을 만들거나, 사회의 구체적인 문제를 혁신할 실전 프로젝트 펀드를 설립한다.',
        weights: { bacon: 5, dewey: 4 },
        traitBonuses: { practical: 5, empirical: 4 }
      },
      {
        id: 'r2_opt3',
        text: '가장 소외되고 고통받는 이웃과 공익 단체에 기부하여 세상 전체의 행복 총량을 키우는 데 쓴다.',
        weights: { bentham: 5, augustine: 4, aquinas: 3, hume: 3 },
        traitBonuses: { happiness: 4, duty: 4 }
      },
      {
        id: 'r2_opt4',
        text: '남들의 시선이나 사회적 성공 기준에서 완전히 탈출하여, 오직 나만의 진짜 꿈과 실존적 자유를 찾아 떠난다.',
        weights: { sartre: 5, heidegger: 4, kierkegaard: 3 },
        traitBonuses: { freedom: 5, practical: 2 }
      }
    ]
  },
  {
    round: 3,
    title: '절친의 기말고사 부정행위',
    category: '정의와 우정의 충돌',
    scenario: '전교 등수와 명문대 수시가 걸린 이번 학기 가장 중요한 기말고사. 우연히 고개를 들었는데, 내 가장 친한 친구가 주머니에서 컨닝페이퍼를 꺼내 답을 적고 있는 장면을 나 혼자 똑똑히 목격했다.',
    options: [
      {
        id: 'r3_opt1',
        text: '시험의 공정성은 타협할 수 없는 절대 원칙이다. 아무리 절친이라도 원칙대로 선생님께 정직하게 알린다.',
        weights: { kant: 5, plato: 4, aquinas: 3, hume: -2 },
        traitBonuses: { duty: 5, rational: 3 }
      },
      {
        id: 'r3_opt2',
        text: '시험이 끝난 후 친구를 조용히 불러 "네가 한 짓이 왜 부끄러운지 스스로 깨달았으면 좋겠다"며 자수를 진심으로 설득한다.',
        weights: { socrates: 5, aristotle: 4, hume: 3 },
        traitBonuses: { rational: 4, empirical: 3, duty: 2 }
      },
      {
        id: 'r3_opt3',
        text: '친구와의 끈끈한 의리와 친구의 절박한 처지를 감안해, 이번 한 번은 가슴에 묻고 비밀을 지켜준다.',
        weights: { sophist: 5, hume: 4, kant: -4 },
        traitBonuses: { empirical: 4, practical: 3, duty: -3 }
      },
      {
        id: 'r3_opt4',
        text: '개인을 탓하기 전에, 학생들을 극한의 성적 경쟁으로 내몰아 부정행위를 유발하는 비교육적 평가 방식부터 개선해야 한다.',
        weights: { dewey: 4, mill: 3, plato: 2 },
        traitBonuses: { practical: 4, empirical: 3 }
      }
    ]
  },
  {
    round: 4,
    title: '완벽한 가상 쾌락: 행복 기계',
    category: '진짜 삶 vs 가짜 행복',
    scenario: '미래 과학 연구소에서 뇌에 전극을 연결하면 평생 고통은 전혀 없이, 내가 꿈꾸는 최고의 연애·인기·성공만을 100% 생생하게 느끼게 해주는 기계를 개발했다. 단, 한 번 들어가면 죽을 때까지 기계 밖으로 나올 수 없다. 당신의 선택은?',
    options: [
      {
        id: 'r4_opt1',
        text: '가상이라도 고통 없는 영원한 행복이라면 망설일 이유가 없다! 즉시 기계에 접속해 천국을 누린다.',
        weights: { bentham: 5, sophist: 3, mill: -3, socrates: -4 },
        traitBonuses: { happiness: 5, practical: 2, rational: -2 }
      },
      {
        id: 'r4_opt2',
        text: '배부른 돼지보다 배고픈 소크라테스가 낫다! 비록 실패와 아픔이 있더라도 진짜 지적 성숙과 깊이 있는 행복을 택한다.',
        weights: { mill: 5, socrates: 4, plato: 3, bentham: -3 },
        traitBonuses: { rational: 4, freedom: 4, duty: 2 }
      },
      {
        id: 'r4_opt3',
        text: '인간은 직접 부딪히고 실패하며 성장할 때 참된 존재가 된다. 기계 조작 환각은 내 영혼을 좀먹을 뿐이다.',
        weights: { dewey: 4, jaspers: 4, sartre: 4 },
        traitBonuses: { freedom: 5, empirical: 4 }
      },
      {
        id: 'r4_opt4',
        text: '외부 기계에 의존하는 쾌락은 덧없다. 내 마음속 욕망을 다스리고 평정심을 찾는다면 기계 밖에서도 충분히 행복하다.',
        weights: { stoa: 5, epicurus: 4, spinoza: 3 },
        traitBonuses: { rational: 4, happiness: 4 }
      }
    ]
  },
  {
    round: 5,
    title: '초지능 AI의 완벽한 인생 설계도',
    category: '이성과 데이터 vs 인간의 자유의지',
    scenario: '전 인류의 빅데이터를 마스터한 슈퍼 AI가 내 유전자와 뇌파를 정밀 분석했다. "너는 26세에 화학 연구원이 되고, 29세에 A와 결혼해야 인생 행복 지수 99.8%를 달성한다"는 완벽한 인생 가이드북을 내놓았다. 당신은 어떻게 할 것인가?',
    options: [
      {
        id: 'r5_opt1',
        text: '데이터와 확률이 완벽하다면 쓸데없는 인생 낭비와 고통을 줄이기 위해 AI의 최적화 설계를 적극 따른다.',
        weights: { bentham: 5, bacon: 4, spinoza: 2 },
        traitBonuses: { practical: 5, rational: 3 }
      },
      {
        id: 'r5_opt2',
        text: '설령 실패하고 파멸하더라도 내 삶의 방향은 오직 내가 고른다! 내 인생에 정해진 각본 따위는 거부한다.',
        weights: { sartre: 5, kierkegaard: 4, heidegger: 4, spinoza: -3 },
        traitBonuses: { freedom: 5, duty: 1 }
      },
      {
        id: 'r5_opt3',
        text: 'AI의 조언을 절대 진리로 맹신하진 않되, 나의 성장을 돕는 훌륭한 유용한 도구로 삼아 참고한다.',
        weights: { dewey: 5, aristotle: 3, hume: 2 },
        traitBonuses: { practical: 4, empirical: 4 }
      },
      {
        id: 'r5_opt4',
        text: 'AI조차 오류나 편견이 있을 수 있다. 이 분석 결과가 과연 도저히 의심할 수 없는 확실한 참인지 전제부터 철저히 파헤친다.',
        weights: { descartes: 5, socrates: 4 },
        traitBonuses: { rational: 5, empirical: 2 }
      }
    ]
  },
  {
    round: 6,
    title: 'SNS 마녀사냥과 허위 루머 폭탄',
    category: '군중심리와 내면의 태도',
    scenario: '내가 하지도 않은 부도덕한 행동에 대한 악의적 짜깁기 글이 SNS와 단톡방에 퍼졌다. 학교 학생들과 네티즌 수천 명이 내 계정으로 몰려와 입에 담지 못할 악플과 비난을 쏟아붓고 있다. 당신의 대응은?',
    options: [
      {
        id: 'r6_opt1',
        text: '남들의 입방아와 비난은 내가 어찌할 수 없는 바깥세상의 바람일 뿐이다. 내 양심의 떳떳함을 믿고 마음을 고요히 다스린다.',
        weights: { stoa: 5, epicurus: 4, spinoza: 3 },
        traitBonuses: { rational: 4, happiness: 4 }
      },
      {
        id: 'r6_opt2',
        text: '가만히 있으면 거짓이 진실이 된다. 사람들이 떠도는 말에 휘둘리는 편견부터 깨기 위해, 증거와 타임라인을 낱낱이 모아 팩트 자료로 반박한다.',
        weights: { bacon: 5, descartes: 3, socrates: 2 },
        traitBonuses: { rational: 5, practical: 4 }
      },
      {
        id: 'r6_opt3',
        text: '분노에 찬 사람들의 상처와 불안한 감정을 먼저 헤아리며, 진심 어린 대화와 공감으로 오해의 매듭을 풀어간다.',
        weights: { hume: 5, aristotle: 3, socrates: 2 },
        traitBonuses: { empirical: 5, happiness: 2 }
      },
      {
        id: 'r6_opt4',
        text: '이 부당한 벼랑 끝 시련이야말로 진짜 내 곁에 남을 사람과 가짜를 가려내고, 내면의 독립심을 깨우는 전환점이다.',
        weights: { kierkegaard: 5, jaspers: 4, heidegger: 3 },
        traitBonuses: { freedom: 5, duty: 2 }
      }
    ]
  },
  {
    round: 7,
    title: '흑역사와 기억 삭제 알약',
    category: '경험의 의미와 자아',
    scenario: '최첨단 신경의학으로 내 인생에서 가장 수치스러웠던 흑역사나 잊지 못할 이별, 극심한 실패의 기억 딱 하나를 머릿속에서 완전히 지워주는 알약이 출시되었다. 부작용은 없다. 먹을 것인가?',
    options: [
      {
        id: 'r7_opt1',
        text: '불필요한 트라우마와 마음의 고통을 굳이 안고 살 필요가 없다. 즉시 지우고 산뜻하고 평온한 마음으로 살아간다.',
        weights: { epicurus: 5, bentham: 4, sophist: 2 },
        traitBonuses: { happiness: 5, practical: 2 }
      },
      {
        id: 'r7_opt2',
        text: '아무리 찢어지게 아픈 상처라도 그 실패와 경험이 지금의 나를 만들었다. 내 불완전한 역사를 온전히 껴안는다.',
        weights: { heidegger: 5, aristotle: 4, dewey: 3 },
        traitBonuses: { empirical: 4, freedom: 4 }
      },
      {
        id: 'r7_opt3',
        text: '그 고통이 왜 생겨났는지 자연의 인과법칙을 냉철하게 이해하면, 굳이 기억을 지우지 않아도 저절로 마음에 평화가 온다.',
        weights: { spinoza: 5, stoa: 4, descartes: 3 },
        traitBonuses: { rational: 5, happiness: 3 }
      },
      {
        id: 'r7_opt4',
        text: '약물로 기억을 도망치는 것은 내 실존에 대한 비겁한 기만이다. 내 상처를 정면으로 응시하며 당당하게 결단하겠다.',
        weights: { sartre: 5, jaspers: 4, kierkegaard: 3 },
        traitBonuses: { freedom: 5, duty: 2 }
      }
    ]
  },
  {
    round: 8,
    title: '무인도 표류: 새로운 법률 제정',
    category: '사회와 정치의 기본 원리',
    scenario: '비행기 불시착으로 학생과 교사 100명이 지도에도 없는 무인도에 갇혔다. 구조대가 언제 올지 모르는 상황에서 100명이 함께 살아갈 규칙과 통치 방식을 정해야 한다. 어떤 방식이 가장 지혜로울까?',
    options: [
      {
        id: 'r8_opt1',
        text: '지혜롭고 정의로우며 사리사욕이 없는 가장 뛰어난 리더를 엄선해 전권을 맡기는 것이 혼란을 막는 길이다.',
        weights: { plato: 5, aquinas: 3, aristotle: 2 },
        traitBonuses: { rational: 5, duty: 3 }
      },
      {
        id: 'r8_opt2',
        text: '모든 구성원이 매일 모여 토론하고 투표하며, 시행착오를 겪으면서 현실에 맞게 규칙을 끊임없이 수정해나간다.',
        weights: { dewey: 5, mill: 4 },
        traitBonuses: { practical: 4, freedom: 4, empirical: 3 }
      },
      {
        id: 'r8_opt3',
        text: '어떤 극한의 재난 속에서도 절대 침해할 수 없는 기본적 인권과 도덕적 절대 원칙(살인·폭력·약탈 금지)을 헌법으로 제정한다.',
        weights: { kant: 5, aquinas: 4, augustine: 2 },
        traitBonuses: { duty: 5, rational: 3 }
      },
      {
        id: 'r8_opt4',
        text: '거창한 도덕보다 당장 물자 배급, 땔감 확보, 생존율 극대화를 최우선으로 하는 유연한 실속형 규칙을 짠다.',
        weights: { bentham: 5, sophist: 4, mill: 2 },
        traitBonuses: { practical: 5, happiness: 3 }
      }
    ]
  },
  {
    round: 9,
    title: '사망 시계: 내 수명의 카운트다운',
    category: '유한성과 삶의 본질',
    scenario: '내 이마에 손을 대면 내가 정확히 몇 살, 몇 월, 며칠에 죽는지 초 단위까지 알려주는 신비한 유물 시계가 발견되었다. 단 한 번 볼 수 있다면 당신은 확인할 것인가?',
    options: [
      {
        id: 'r9_opt1',
        text: '반드시 확인한다! 끝이 언제인지 똑똑히 알아야 세상 사람들의 헛된 눈치 대신 진짜 나만의 본래적인 삶을 불태울 수 있다.',
        weights: { heidegger: 5, jaspers: 4, stoa: 2 },
        traitBonuses: { freedom: 5, rational: 3 }
      },
      {
        id: 'r9_opt2',
        text: '절대 보지 않는다. 죽는 날을 미리 아는 순간 남은 인생은 공포와 불안의 지옥이 된다. 지금 내 앞의 평온한 하루가 우선이다.',
        weights: { epicurus: 5, spinoza: 3, bentham: 2 },
        traitBonuses: { happiness: 5, practical: 2 }
      },
      {
        id: 'r9_opt3',
        text: '확인하고, 남은 시간 동안 나와 주변 사람들이 누릴 즐거움은 최대로, 고통은 최소로 만들도록 하루하루를 꼼꼼히 계산해 계획한다.',
        weights: { bentham: 5, mill: 2 },
        traitBonuses: { happiness: 5, practical: 3 }
      },
      {
        id: 'r9_opt4',
        text: '삶과 죽음의 때를 결정하는 것은 인간의 교만이 아닌 절대적 섭리다. 오직 주어진 시간 동안 숭고한 사랑과 의무를 다할 뿐이다.',
        weights: { augustine: 5, aquinas: 4, stoa: 2 },
        traitBonuses: { duty: 5, rational: 2 }
      }
    ]
  },
  {
    round: 10,
    title: '학교의 일방적인 부당 교칙',
    category: '권위와 자율성의 대립',
    scenario: '학교에서 학생들의 의견 수렴 없이 "모든 학생 스마트폰 전면 압수, 방과 후 야간 자율학습 10시까지 의무화"라는 극단적인 강제 규칙을 발표했다. 학생들의 불만이 극에 달했다. 당신의 행동은?',
    options: [
      {
        id: 'r10_opt1',
        text: '어떤 권위라도 개인의 개성과 자유를 억압할 권리는 없다! 학생회를 조직하고 대자보를 붙여 전면 거부 투쟁에 나선다.',
        weights: { mill: 5, sartre: 4 },
        traitBonuses: { freedom: 5, duty: 2 }
      },
      {
        id: 'r10_opt2',
        text: '감정적인 데모 대신, 스마트폰 통제가 학생 성적과 심리에 미치는 실제 영향 데이터를 객관적으로 수집해 교장선생님과 실질적 협상에 들어간다.',
        weights: { dewey: 4, bacon: 4, aristotle: 3 },
        traitBonuses: { practical: 5, empirical: 4 }
      },
      {
        id: 'r10_opt3',
        text: '공동체의 질서는 존중되어야 하므로 일단 규칙을 따르면서, 대의 기구와 합법적 절차를 거쳐 품격 있게 개정을 청원한다.',
        weights: { socrates: 5, kant: 4, aquinas: 3, stoa: 2 },
        traitBonuses: { duty: 4, rational: 4 }
      },
      {
        id: 'r10_opt4',
        text: '어차피 바뀌지도 않을 일에 쓸데없이 정력 낭비하지 말고, 안 걸리게 눈치껏 대처하면서 친구들과 조용히 실속을 챙긴다.',
        weights: { sophist: 5, epicurus: 3 },
        traitBonuses: { practical: 4, happiness: 3, duty: -2 }
      }
    ]
  },
  {
    round: 11,
    title: '작은 거짓말 vs 친구의 구원',
    category: '선의의 거짓말과 절대적 도덕',
    scenario: '친구가 억울한 패싸움 누명을 쓰고 형사 처벌을 받을 위기다. 사건 당일 내가 "그 시간에 친구는 나와 함께 스터디카페에 있었다"고 작은 거짓 알리바이를 경찰에 증언해주면 친구는 즉시 누명을 벗고 구제받을 수 있다.',
    options: [
      {
        id: 'r11_opt1',
        text: '거짓말은 그 어떤 핑계로도 정당화될 수 없는 절대적 악이다. 아무리 친구가 가련해도 사법 절차에서 위증할 순 없다.',
        weights: { kant: 5, augustine: 4, aquinas: 3, hume: -3 },
        traitBonuses: { duty: 5, rational: 3, empirical: -2 }
      },
      {
        id: 'r11_opt2',
        text: '형식적인 도덕 규칙보다 눈앞의 무고한 친구를 살리는 게 백만 배 중요하다! 기꺼이 거짓 알리바이를 대서 친구를 구한다.',
        weights: { hume: 5, bentham: 4, sophist: 3, kant: -5 },
        traitBonuses: { empirical: 5, happiness: 3, duty: -3 }
      },
      {
        id: 'r11_opt3',
        text: '거짓말은 또 다른 파멸을 부른다. CCTV와 주변 차량 블랙박스를 이 잡듯이 뒤져서 친구의 진짜 무죄를 입증할 결정적 증거를 찾아낸다.',
        weights: { bacon: 5, dewey: 4, aquinas: 2 },
        traitBonuses: { rational: 4, practical: 4 }
      },
      {
        id: 'r11_opt4',
        text: '이 거짓말로 인해 내가 감옥에 가거나 인생이 꼬이더라도, 오직 내 영혼의 결단으로 친구를 지키고 모든 책임을 온몸으로 감수한다.',
        weights: { kierkegaard: 5, sartre: 4, jaspers: 3 },
        traitBonuses: { freedom: 5, duty: 2 }
      }
    ]
  },
  {
    round: 12,
    title: '모든 노력이 물거품이 된 날',
    category: '시련과 회복탄력성',
    scenario: '1년간 모든 열정과 잠을 포기하고 준비했던 수능 모의평가나 전국 대회에서, 마킹 실수와 컨디션 난조로 역대 최악의 점수를 받고 탈락했다. 주변의 기대는 무너졌고 눈앞이 깜깜하다. 내 마음의 반응은?',
    options: [
      {
        id: 'r12_opt1',
        text: '모든 일은 이미 일어난 필연적 결과다. 자책이나 분노를 거두고 실패의 원인을 냉철하게 분석하여 마음의 평정을 회복한다.',
        weights: { spinoza: 5, stoa: 4, descartes: 3 },
        traitBonuses: { rational: 5, happiness: 3 }
      },
      {
        id: 'r12_opt2',
        text: '이 피할 수 없는 절벽과 한계상황이야말로, 가짜 껍데기를 벗겨내고 진정한 나 자신을 깨우는 가장 소중한 각성의 순간이다.',
        weights: { jaspers: 5, kierkegaard: 4, heidegger: 3 },
        traitBonuses: { freedom: 5, duty: 3 }
      },
      {
        id: 'r12_opt3',
        text: '좌절할 시간에 오답 노트를 펴고 어디서 삐끗했는지 실험하듯 분석하여, 당장 내일부터 적용할 새로운 전술을 실행한다.',
        weights: { dewey: 4, bacon: 4, aristotle: 2 },
        traitBonuses: { practical: 5, empirical: 4 }
      },
      {
        id: 'r12_opt4',
        text: '일단 푹 자고 맛있는 걸 먹으며, 믿을 수 있는 가족이나 친구와 따뜻한 온기를 나누며 지친 내 마음을 보듬는다.',
        weights: { epicurus: 5, hume: 4, aristotle: 2 },
        traitBonuses: { happiness: 5, empirical: 3 }
      }
    ]
  },
  {
    round: 13,
    title: '성인이 되었을 때 바라는 진짜 삶',
    category: '행복과 삶의 목적',
    scenario: '10년 뒤 성인이 된 나. 치열한 세상에서 내가 가장 궁극적으로 도달하고 싶은 삶의 모습은 무엇인가?',
    options: [
      {
        id: 'r13_opt1',
        text: '남들과의 피곤한 경쟁에서 벗어나, 불안과 걱정이 없고 좋은 벗들과 함께 소박한 일상을 누리는 고요하고 평온한 삶.',
        weights: { epicurus: 5, stoa: 3, spinoza: 2 },
        traitBonuses: { happiness: 5, rational: 3 }
      },
      {
        id: 'r13_opt2',
        text: '지적·예술적 교양을 끊임없이 높이고, 생각하는 인간으로서 품격과 깊이를 갖춘 진정한 고차원적 행복을 누리는 삶.',
        weights: { mill: 5, plato: 4, aristotle: 4, socrates: 3 },
        traitBonuses: { rational: 4, happiness: 4, duty: 2 }
      },
      {
        id: 'r13_opt3',
        text: '사회가 강요하는 성공 잣대에 갇히지 않고, 내가 원하는 삶의 방식을 스스로 창조하며 거침없이 살아가는 자유로운 삶.',
        weights: { sartre: 5, heidegger: 4, kierkegaard: 3 },
        traitBonuses: { freedom: 5, practical: 2 }
      },
      {
        id: 'r13_opt4',
        text: '추상적인 말장난 대신, 세상에 실질적인 쓸모를 증명하고 사람들의 삶을 현실적으로 윤택하게 개선해내는 유능한 삶.',
        weights: { dewey: 4, bacon: 4, bentham: 2 },
        traitBonuses: { practical: 5, empirical: 4 }
      }
    ]
  },
  {
    round: 14,
    title: '세상과 운명을 바라보는 나의 눈',
    category: '세계관과 존재의 법칙',
    scenario: '내 삶과 역사에서 일어나는 수많은 우연, 만남, 비극, 행운을 지켜볼 때, 나의 가슴속에 가장 깊게 와닿는 생각은?',
    options: [
      {
        id: 'r14_opt1',
        text: '우주와 세상의 모든 일은 거대한 자연의 법칙과 필연적인 인과관계에 따라 한 치의 오차 없이 흘러가고 있다.',
        weights: { spinoza: 5, stoa: 4 },
        traitBonuses: { rational: 5, happiness: 2 }
      },
      {
        id: 'r14_opt2',
        text: '미리 정해진 운명 따위는 애초에 없다. 세상은 우연으로 가득 차 있으며, 오직 나의 선택과 결단만이 의미를 부여한다.',
        weights: { sartre: 5, kierkegaard: 3 },
        traitBonuses: { freedom: 5, practical: 2 }
      },
      {
        id: 'r14_opt3',
        text: '우주의 거창한 비밀은 알 수 없지만, 직접 겪고 관찰하며 더 나은 사회를 만들어가는 실천적 과정 자체가 삶의 진리다.',
        weights: { dewey: 4, bacon: 4, hume: 3 },
        traitBonuses: { empirical: 5, practical: 4 }
      },
      {
        id: 'r14_opt4',
        text: '인간의 미천한 지혜를 내려놓고, 우주를 초월하여 존재하는 영원한 진리와 거룩한 사랑의 섭리에 겸허히 귀의한다.',
        weights: { augustine: 5, kierkegaard: 3, aquinas: 3, plato: 2 },
        traitBonuses: { duty: 5, rational: 3 }
      }
    ]
  },
  {
    round: 15,
    title: '최후의 라운드: 지구 종말 1시간 전',
    category: '마지막 순간의 실존',
    scenario: '거대한 소행성이 지구를 향해 돌진하고 있다. 충돌까지 남은 시간은 단 1시간. 세상은 공황에 빠졌고 피할 곳은 없다. 당신이 맞이할 마지막 60분은?',
    options: [
      {
        id: 'r15_opt1',
        text: '패닉에 휩쓸리지 않고, 평생 아꼈던 이들에게 감사와 사랑을 전하며 우주의 섭리를 고요하고 담담하게 수용한다.',
        weights: { stoa: 5, epicurus: 4, spinoza: 4 },
        traitBonuses: { rational: 4, happiness: 4 }
      },
      {
        id: 'r15_opt2',
        text: '세상이 끝나는 순간이라도 도덕적 의무와 선의지는 사라지지 않는다. 두려움에 떠는 주변 사람들의 손을 잡아주며 인간의 존엄을 지킨다.',
        weights: { kant: 5, augustine: 4, socrates: 3 },
        traitBonuses: { duty: 5, rational: 3 }
      },
      {
        id: 'r15_opt3',
        text: '마지막 1초까지 사람들과 머리를 맞대고 소행성 궤도를 관측·분석하며, 단 0.001%의 생존 가능성이라도 찾아내 실행한다.',
        weights: { bacon: 5, dewey: 4 },
        traitBonuses: { practical: 5, empirical: 4 }
      },
      {
        id: 'r15_opt4',
        text: '도망치지 않고 죽음을 정면으로 응시하며, 내 모든 선택으로 완성된 나의 유일무이한 인생을 온전히 긍정하는 마지막 글을 남긴다.',
        weights: { heidegger: 5, sartre: 5, kierkegaard: 4 },
        traitBonuses: { freedom: 5, duty: 2 }
      }
    ]
  }
];
