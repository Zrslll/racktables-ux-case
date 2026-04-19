# Session Handoff: RackTables UX Case → Figma Transfer

**Date**: 2026-04-18  
**Status**: Completed  
**Figma file**: https://www.figma.com/design/r7GRIstGmFbDG2P84rlEZH/Untitled

---

## 📋 What Was Done

### Completed
- [x] Создана структура страниц в Figma (5 страниц)
- [x] Созданы Design Tokens (переменные Figma) из `prototype/styles.css`
- [x] Страница `🔴 Before` — реальные скриншоты + аннотации проблем P1–P8
- [x] Страница `🟢 After — Objects List` — полный прототип списка объектов
- [x] Страница `🟢 After — Object Card` — полный прототип карточки объекта
- [x] Страница `🔀 User Flow` — диаграмма пользовательского флоу
- [x] Страница `📋 Case Overview` — обзор кейса, JTBD, проблемная карта, метрики
- [x] Исправлены layout-проблемы (clipsContent, primaryAxisSizingMode)
- [x] Заменены мок-скрины в Before на реальные assets
- [x] Удалены все мусорные/дубликатные фреймы

---

## 🗂️ Структура Figma-файла

### Страницы и ключевые node ID

| Страница | Page ID | Главный фрейм ID | Размер |
|---|---|---|---|
| `📋 Case Overview` | `1:2` | `1:872` | 1800×1200 |
| `🔴 Before` | `1:3` | `1:1089` | 1800×1200 |
| `🟢 After — Objects List` | `1:4` | `1:42` | 1440×856 |
| `🟢 After — Object Card` | `1:5` | `11:1497` | 1440×1074 |
| `🔀 User Flow` | `1:6` | `1:763` | 1800×900 |

### Design Tokens
- Коллекция: `RackTables Tokens` (Default mode)
- Содержит: цвета, радиусы, отступы, размеры шрифтов
- Источник: `/prototype/styles.css`

---

## 🏗️ Структура локального проекта

```
/Users/sirio/Downloads/racktables-ux-case/
├── README.md                      # Обзор проекта
├── case.md                        # Полный текст кейса (JTBD, проблемы P1–P10, метрики)
├── SESSION_HANDOFF.md             # Этот файл
├── assets/
│   ├── before-list.jpg            # Скриншот "до" — список объектов (используется в Before)
│   └── before-object.jpg          # Скриншот "до" — карточка объекта (используется в Before)
└── prototype/
    ├── index.html                 # Прототип: список объектов (After)
    ├── object.html                # Прототип: карточка объекта (After)
    ├── styles.css                 # Дизайн-система (цвета, типографика, компоненты)
    └── data.js                    # Мок-данные для прототипов
```

---

## 🎨 Дизайн-система

### Цвета (ключевые)
| Токен | Hex | Использование |
|---|---|---|
| `appbar` | `#1d2330` | Верхняя навигационная панель |
| `crumbs` | `#1f5fa8` | Хлебные крошки / accent |
| `bg` | `#f6f7f9` | Фон страницы |
| `surface` | `#ffffff` | Фон карточек |
| `border` | `#e3e6ec` | Границы элементов |
| `text` | `#1a2030` | Основной текст |
| `muted` | `#5b6574` | Вторичный текст |
| `error-bg` | `#fde2e3` | Фон ошибки/проблемы |
| `error-text` | `#c5363a` | Цвет ошибки |

### Шрифт
- **Inter** (Regular, Medium, Semi Bold, Bold)
- Базовый размер: 13px, заголовки: 22px, мелкий текст: 11–12px

---

## 📄 Содержимое страниц

### 📋 Case Overview (1:872)
Секции:
- Context & User (персона: Сетевой инженер / DevOps)
- JTBD (Jobs To Be Done)
- Problem Map (P1–P8 таблица)
- Hypothesis & Design Principles
- Metrics Before/After (таблица)

### 🔴 Before (1:1089)
- `Before — List Screenshot` — реальный скриншот `assets/before-list.jpg`
- `Before — Object Screenshot` — реальный скриншот `assets/before-object.jpg`
- Аннотации P1–P8: highlight-прямоугольники + пронумерованные пины + карточки с описанием

### 🟢 After — Objects List (1:42)
Структура фрейма:
```
Objects List — After (1440×856)
├── Appbar (1440×40, bg #1d2330)
├── Breadcrumbs (1440×36, bg #1f5fa8)
└── Page Content (1440, AUTO height)
    ├── H1 Row ("Objects · London")
    ├── Filter Bar
    │   ├── Search input
    │   ├── Buttons (Export CSV, + Add Object)
    │   └── Filter chips (Type, Location, Status, Tag)
    ├── Data Table
    │   ├── Table Header (8 колонок)
    │   ├── Rows (×5 с данными, статус-бейджи, теги)
    │   └── Footer (density toggle: Compact/Regular/Comfortable)
    └── Pagination
```

### 🟢 After — Object Card (11:1497)
Структура фрейма:
```
Object Card — After (1440×1074)
├── Appbar (1440×40)
├── Breadcrumbs (1440×36) с Quick jump
└── Page Content
    ├── Detail Header (карточка)
    │   ├── TopRow: "London server 4" + Problem badge + Action buttons
    │   ├── MetaRow: Type, Label, Asset tag, HW, SW, Location
    │   └── Alert: ⚠ описание проблемы + кнопки "Создать задачу" / "Снять флаг"
    └── Detail Grid (горизонтальный)
        ├── Left Column (1112px)
        │   ├── Section: Summary (развёрнут, 7 полей inline-edit + теги)
        │   ├── Section: Ports (развёрнут, таблица 2 порта)
        │   ├── Section: IP Addresses (развёрнут, 2 строки)
        │   ├── Section: NATv4 (свёрнут)
        │   └── Section: 802.1Q VLAN (свёрнут)
        └── Right Column (280px)
            ├── Rack Panel (U1–U15, текущий объект U8 выделен красным)
            └── Connections Panel (5 связей с role-пилюлями)
```

### 🔀 User Flow (1:763)
Флоу: Trigger → Find & Filter → Open Card → Edit Inline  
Включает: Fallback Note + Metrics Panel (время до нужного объекта, кол-во кликов)

---

## 🔧 Технические детали

### Figma MCP
- Использовался `figma-console` MCP (Desktop Bridge plugin)
- Все элементы созданы через `figma_execute` (Plugin API)
- Изображения в Before-page применялись через imageHash из `figma_set_image_fill`

### Паттерны построения фреймов
```javascript
// Вертикальный auto-height фрейм
f.layoutMode = 'VERTICAL';
f.primaryAxisSizingMode = 'AUTO';   // растягивается по контенту
f.counterAxisSizingMode = 'FIXED';  // фиксированная ширина
f.clipsContent = false;             // не обрезать содержимое

// Горизонтальный fixed фрейм
f.layoutMode = 'HORIZONTAL';
f.primaryAxisSizingMode = 'FIXED';
f.counterAxisSizingMode = 'FIXED';
f.counterAxisAlignItems = 'CENTER'; // вертикальное выравнивание по центру

// Spacer (растягивается, заполняет место)
s.layoutGrow = 1;
```

### Типичные ошибки (и исправления)
| Ошибка | Причина | Решение |
|---|---|---|
| Контент обрезан | `clipsContent = true` + `primaryAxisSizingMode = 'FIXED'` | Установить `AUTO` и `false` |
| `Invalid enum value 'FILL'` | `primaryAxisSizingMode` не поддерживает `'FILL'` | Использовать `'AUTO'` |
| `Font could not be loaded` | Неверное написание стиля | `'Semi Bold'` (с пробелом), не `'SemiBold'` |
| Изображение не применяется | `figma_set_image_fill` иногда не обновляет ноду | Применять через `node.fills = [{ type: 'IMAGE', imageHash, scaleMode: 'FIT' }]` |

---

## 🚀 Следующие шаги (если продолжать)

1. **Интерактивность**: добавить Figma Prototype-связи между страницами (hover states, transitions)
2. **Компоненты**: оформить повторяющиеся элементы (Appbar, Breadcrumbs, Section, StatusBadge) как Figma Components
3. **Состояния**: добавить варианты для inline-edit (idle / editing / saved)
4. **P9–P10**: дописать аннотации на Before-странице (если нужны все 10 проблем из case.md)
5. **Переименовать файл**: убрать "Untitled" → "RackTables UX Case"
6. **Export**: подготовить PDF-версию кейса из страниц Figma

---

## 💡 Как продолжить на другом компьютере

1. Открыть Figma-файл: https://www.figma.com/design/r7GRIstGmFbDG2P84rlEZH/Untitled
2. Клонировать/скопировать проект: `rsync -av /Users/sirio/Downloads/racktables-ux-case/ <dest>/`
3. Убедиться что MCP `figma-console` подключён (Figma Desktop + Desktop Bridge plugin)
4. Использовать node ID из таблицы выше для навигации
5. При работе с Plugin API — всегда начинать с `await figma.loadAllPagesAsync()`

---

## 📞 Ключевые вопросы для следующей сессии

1. Нужно ли добавить аннотации P9–P10 на Before-странице?
2. Оформить Appbar/Breadcrumbs как переиспользуемые компоненты?
3. Добавить hover/active состояния для интерактивных элементов?
4. Подготовить экспорт для презентации (PDF / Figma Prototype)?
