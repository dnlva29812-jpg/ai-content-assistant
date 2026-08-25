const form = document.querySelector('#content-form');
const emptyState = document.querySelector('#empty-state');
const results = document.querySelector('#results');
const ideasList = document.querySelector('#reels-ideas');
const template = document.querySelector('#idea-template');

const clean = (value) => value.trim();

function contentFor(niche, topic, goal) {
  const goalPhrase = { Продажи: 'поможет сделать первый шаг к вашему продукту', Вовлечение: 'вызовет узнавание и комментарии', Обучение: 'даст понятную пользу уже сегодня' }[goal];
  return {
    ideas: [
      `«3 ошибки в теме “${topic}”, которые совершают почти все»`,
      `До / после: что меняется, когда ${niche.toLowerCase()} смотрит на «${topic}» иначе`,
      `Миф или правда: самый популярный совет про «${topic}»`,
      `Личный опыт: момент, когда я поняла важное про «${topic}»`,
      `Мини-инструкция: что сделать сегодня, чтобы продвинуться в теме «${topic}»`
    ],
    title: `Как начать менять «${topic}» без давления на себя`,
    script: [
      ['Хук · 0–3 сек', `«Вам не нужно делать ещё больше, чтобы разобраться с темой “${topic}”.»`],
      ['Проблема · 3–10 сек', `Коротко покажите знакомую ситуацию вашей аудитории и назовите главную ошибку.`],
      ['Решение · 10–25 сек', `Дайте один простой шаг от лица ${niche.toLowerCase()}: что можно попробовать уже сегодня.`],
      ['Финал · 25–30 сек', `«Сохраните, если хотите вернуться к этому позже — и напишите “хочу”, если нужна помощь».`]
    ],
    post: `«${topic}» — не про идеальный результат.\n\nЧасто мы ждём подходящего момента, больше сил или правильного настроения. Но маленький и честный шаг работает лучше, чем очередной список требований к себе.\n\nНачните с вопроса: что я могу сделать для себя сегодня без перегруза?\n\nПоделитесь в комментариях: что в этой теме сейчас откликается вам сильнее всего?`,
    prompt: `Lifestyle editorial photo for a social media post about “${topic}”, warm natural morning light, calm confident person, soft cream and sage palette, authentic details, minimal composition, gentle film grain, vertical 4:5, no text. The image should feel supportive and practical for an audience of ${niche}. Content goal: ${goal.toLowerCase()}, so the visual ${goalPhrase}.`
  };
}

function renderContent(data) {
  ideasList.innerHTML = '';
  data.ideas.forEach((idea, index) => {
    const item = template.content.cloneNode(true);
    item.querySelector('.idea-number').textContent = String(index + 1).padStart(2, '0');
    item.querySelector('.idea-text').textContent = idea;
    ideasList.append(item);
  });
  document.querySelector('#script-title').textContent = data.title;
  const scriptContent = document.querySelector('#script-content');
  scriptContent.replaceChildren(...data.script.map(([label, text]) => {
    const block = document.createElement('div');
    const heading = document.createElement('b');
    heading.textContent = label;
    block.append(heading, document.createTextNode(text));
    return block;
  }));
  document.querySelector('#post-content').textContent = data.post;
  document.querySelector('#prompt-content').textContent = data.prompt;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  renderContent(contentFor(clean(formData.get('niche')), clean(formData.get('topic')), formData.get('goal')));
  emptyState.hidden = true;
  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#reset-button').addEventListener('click', () => document.querySelector('#niche').focus());
document.querySelector('.copy-button').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  await navigator.clipboard.writeText(document.querySelector(`#${button.dataset.copy}`).textContent);
  button.firstChild.textContent = 'Скопировано ';
  setTimeout(() => { button.firstChild.textContent = 'Скопировать '; }, 1800);
});
