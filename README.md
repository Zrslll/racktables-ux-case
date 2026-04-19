# RackTables → Objects · UX-кейс

Комплект для тестового задания.

## Что внутри

```
racktables-ux-case/
  case.md                       ← основной разбор кейса (читать первым)
  assets/
    before-list.jpg             ← оригинальный скриншот списка Objects
    before-object.jpg           ← оригинальный скриншот карточки London server 4
  prototype/
    index.html                  ← улучшенный список Objects
    object.html                 ← улучшенная карточка объекта
    styles.css                  ← дизайн-токены, плотная таблица, секции
    app.js                      ← поиск/фильтры/сортировка/density
    data.js                     ← мок-данные на основе demo.racktables.org
    before/
      list.html                 ← скриншот «до» с разметкой проблем
      object.html               ← скриншот «до» карточки с разметкой
```

## Как открыть

1. `case.md` — открыть в любом markdown-вьювере (Obsidian, VS Code preview).
2. `prototype/index.html` — двойной клик в Finder → откроется в браузере.
3. Из списка кликнуть строку `London server 4` → откроется карточка с inline-edit.
4. На обеих страницах прототипа: ссылки в шапке (`Main page`), breadcrumbs, и переходы из стойки.
5. Сравнение «до»: `prototype/before/list.html` и `prototype/before/object.html`.

Прототип статичный (HTML + CSS + vanilla JS), запуск локального сервера не требуется.

## Что попробовать в прототипе

- **Список:** ввести `lond` в поиск; кликнуть чип `Server` + `Has problems`; отсортировать по `Asset tag`; переключить density.
- **Карточка:** кликнуть по comment → ввести текст → Enter; нажать `+ Добавить порт`; свернуть/развернуть секции NATv4 и 802.1Q.

## Next step

Перенос финальных экранов в Figma — после получения ссылки на файл.
