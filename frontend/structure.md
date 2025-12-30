backend/
 ├─ config/
 │   ├─ db.js                    🔧 Connexion MongoDB
 │   └─ env.js                   🔧 Variables d'environnement
 │
 ├─ models/                      📊 SCHÉMAS DE DONNÉES
 │   ├─ User.model.js            └─> email, name, password, role
 │   ├─ Conversation.model.js    └─> participants, lastMessage, lastMessageAt
 │   └─ Message.model.js         └─> conversationId, sender, text, createdAt
 │
 ├─ controllers/                 🧠 LOGIQUE MÉTIER
 │   ├─ auth.controller.js       └─> register(), login(), getProfile()
 │   ├─ conversation.controller.js └─> getConversations(), createConversation()
 │   └─ message.controller.js    └─> getMessages(), sendMessage()
 │
 ├─ routes/                      🛣️ URL API
 │   ├─ auth.routes.js           └─> POST /api/auth/register, /login
 │   ├─ conversation.routes.js   └─> GET /api/conversations
 │   └─ message.routes.js        └─> GET /api/messages/:conversationId, POST /api/messages
 │
 ├─ middlewares/
 │   ├─ auth.middleware.js       └─> Vérifie JWT
 │   └─ error.middleware.js      └─> Gestion erreurs
 │
 ├─ sockets/
 │   └─ message.socket.js        🔌 Gestion temps réel messages
 │
 ├─ utils/
 │   └─ jwt.js                   🔑 Création / vérification JWT
 │
 ├─ app.js                       🚀 Express app
 ├─ server.js                    🚀 HTTP + Socket.IO
 ├─ .env                         🔐 MONGO_URI, JWT_SECRET
 └─ package.json                 📦 Dépendances backend


frontend/
 ├─ public/
 │   └─ index.html
 │
 ├─ src/
 │   │
 │   ├─ api/                     🌐 SERVICES FETCH (sans axios)
 │   │   ├─ authService.js       └─> registerUser(), loginUser(), getProfile()
 │   │   ├─ conversationService.js └─> getConversations(), createConversation()
 │   │   └─ messageService.js    └─> getMessages(), sendMessage()
 │   │
 │   ├─ components/              🧩 COMPOSANTS RÉUTILISABLES
 │   │   ├─ layout/
 │   │   │   ├─ AppLayout.tsx
 │   │   │   └─ DashboardLayout.tsx
 │   │   │
 │   │   ├─ chat/
 │   │   │   ├─ ConversationList.tsx
 │   │   │   ├─ MessageList.tsx
 │   │   │   └─ MessageBubble.tsx
 │   │   │
 │   │   └─ common/
 │   │       ├─ ProtectedRoute.tsx
 │   │       └─ Loader.tsx
 │   │
 │   ├─ pages/
 │   │   ├─ public/
 │   │   │   ├─ Home.tsx
 │   │   │   ├─ Login.tsx        # TanStack Form intégré
 │   │   │   └─ Register.tsx     # TanStack Form intégré
 │   │   │
 │   │   ├─ private/
 │   │   │   ├─ Dashboard.tsx
 │   │   │   ├─ Conversations.tsx  # MessageForm intégré
 │   │   │   └─ Chat.tsx
 │   │   │
 │   │   └─ admin/
 │   │       └─ RefineApp.tsx      # refine.dev dashboard
 │   │
 │   ├─ context/
 │   │   └─ AuthContext.tsx        🌍 user, isAuthenticated, login(), logout()
 │   │
 │   ├─ hooks/
 │   │   ├─ useAuth.ts             🪝 Accès simplifié AuthContext
 │   │   └─ useSocket.ts           🪝 Connexion Socket.IO
 │   │
 │   ├─ utils/
 │   │   └─ constants.ts           🔧 URL API, autres constantes
 │   │
 │   ├─ routes/
 │   │   ├─ AppRoutes.tsx          🛣️ Définit routes publiques / privées
 │   │   └─ PrivateRoute.tsx       🛡️ Protège les routes privées
 │   │
 │   ├─ styles/
 │   │   └─ theme.ts               🎨 Thème Mantine
 │   │
 │   └─ main.tsx                   🚀 Point d'entrée React
 │
 ├─ index.html
 ├─ package.json
 └─ vite.config.ts
