# Sunoff Garage — сайт студии тонировки

**Next.js 14 · Prisma · PostgreSQL · Tailwind CSS**

---

## Деплой на Vercel

### 1. База данных

Подключите бесплатную PostgreSQL базу:
- [Neon](https://neon.tech) — рекомендуется (бесплатный tier)
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com)

### 2. Переменные окружения

В настройках проекта на Vercel добавьте:

| Переменная | Описание |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |

### 3. Первый деплой

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/sunoff
cd sunoff

# Установите зависимости
npm install   # или bun install

# Создайте таблицы в БД
npx prisma db push

# Запустите локально
npm run dev
```

### 4. Push schema на Vercel

После первого деплоя выполните миграцию:
```bash
npx prisma db push
```

---

## Локальная разработка

```bash
# Скопируйте env
cp .env.example .env.local
# Заполните DATABASE_URL

npm install
npm run dev
```

Сайт откроется на [http://localhost:3000](http://localhost:3000)
