# Advanced AI Project

A comprehensive AI-powered application built with **Next.js**, **Supabase**, and **Flask**.

## 🚀 Features

- **User Authentication** - Secure sign up/sign in with Supabase Auth
- **AI Model Management** - Create and manage different AI model configurations
- **Real-time Chat** - Interactive chat interface with AI models
- **Prediction History** - Track and analyze AI predictions
- **Modern UI** - Beautiful, responsive design with Tailwind CSS
- **Database Management** - PostgreSQL with Supabase for data persistence
- **Flask Backend** - Python backend for AI processing

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase Client** - Database and authentication

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Supabase** - PostgreSQL database with real-time features

### Database
- **PostgreSQL** - Relational database via Supabase
- **Row Level Security** - Secure data access
- **Real-time subscriptions** - Live data updates

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Supabase account

## 🔧 Setup Instructions

### 1. Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Click "Connect to Supabase"** button in the top right of this interface
3. **Run the database migration**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/migrations/create_ai_project_schema.sql`
   - Execute the SQL to create tables and security policies

### 2. Environment Variables

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
FLASK_API_URL=http://localhost:5000
```

### 3. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

### 4. Run the Application

**Start the Next.js frontend:**
```bash
npm run dev
```

**Start the Flask backend (in a new terminal):**
```bash
cd backend
python app.py
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage Guide

### 1. Authentication
- Sign up for a new account or sign in with existing credentials
- User profiles are automatically created in the database

### 2. AI Models
- Create different AI model configurations
- Choose from various model types (text generation, sentiment analysis, etc.)
- Manage model parameters and settings

### 3. Chat Interface
- Start conversations with your AI models
- Real-time chat with AI responses
- Conversation history is automatically saved

### 4. Predictions
- View prediction history and analytics
- Track model performance and confidence scores
- Analyze usage patterns

## 🏗️ Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard components
│   │   └── ui/             # Reusable UI components
│   └── lib/                # Utilities and configurations
├── backend/                # Flask backend
│   ├── app.py             # Main Flask application
│   └── requirements.txt   # Python dependencies
├── supabase/
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

## 🔒 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Authentication required** - All API endpoints require valid user session
- **Input validation** - Server-side validation for all inputs
- **CORS protection** - Configured for secure cross-origin requests

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository to Vercel or Netlify
2. Set environment variables in the deployment platform
3. Deploy automatically on git push

### Backend (Railway/Heroku)
1. Create a new project on Railway or Heroku
2. Connect your repository
3. Set environment variables
4. Deploy the Flask application

## 🔧 Customization

### Adding New AI Models
1. Update the model types in `ModelManager.tsx`
2. Add corresponding logic in `backend/app.py`
3. Update database schema if needed

### Extending the Chat Interface
1. Modify `ChatInterface.tsx` for UI changes
2. Update the `/api/chat` endpoint in Flask
3. Add new message types or features

### Database Schema Changes
1. Create new migration files in `supabase/migrations/`
2. Update TypeScript types in `src/lib/supabase.ts`
3. Modify components to use new data structures

## 🐛 Troubleshooting

### Common Issues

1. **Supabase connection errors**
   - Verify environment variables are correct
   - Check if Supabase project is active
   - Ensure RLS policies are properly configured

2. **Flask backend not responding**
   - Make sure Flask server is running on port 5000
   - Check CORS configuration
   - Verify Python dependencies are installed

3. **Authentication issues**
   - Clear browser localStorage
   - Check Supabase Auth settings
   - Verify email confirmation is disabled (for development)

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

For questions or support, please open an issue in the repository.