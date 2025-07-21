from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Simple AI response generator (replace with actual AI model)
def generate_ai_response(message, conversation_history):
    """
    Simple AI response generator. In a real application, you would:
    1. Use OpenAI API, Hugging Face, or other AI services
    2. Implement proper context handling
    3. Add error handling and rate limiting
    """
    
    # Simulate processing time
    time.sleep(1)
    
    # Simple rule-based responses (replace with actual AI)
    responses = [
        f"I understand you're asking about: {message}. Let me help you with that.",
        f"That's an interesting question about {message}. Here's what I think...",
        f"Based on your message '{message}', I can provide some insights.",
        f"Thank you for your question. Regarding {message}, here's my response...",
        "I'm an AI assistant built with Flask and Next.js. How can I help you today?",
        "This is a demo AI response. In a real application, this would be powered by GPT, Claude, or another AI model.",
    ]
    
    # Simple context awareness
    if "hello" in message.lower() or "hi" in message.lower():
        return "Hello! I'm your AI assistant. How can I help you today?"
    elif "how are you" in message.lower():
        return "I'm doing well, thank you for asking! I'm here to help with any questions you have."
    elif "weather" in message.lower():
        return "I don't have access to real-time weather data, but I'd be happy to help with other questions!"
    elif "time" in message.lower():
        return f"The current server time is {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}."
    
    return random.choice(responses)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        conversation_history = data.get('conversation_history', [])
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Generate AI response
        response = generate_ai_response(message, conversation_history)
        
        return jsonify({
            'response': response,
            'timestamp': datetime.now().isoformat(),
            'model': 'demo-ai-model'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = data.get('input_data', {})
        model_type = data.get('model_type', 'general')
        
        # Simulate AI prediction (replace with actual model)
        if model_type == 'sentiment-analysis':
            sentiments = ['positive', 'negative', 'neutral']
            result = {
                'sentiment': random.choice(sentiments),
                'scores': {
                    'positive': random.uniform(0, 1),
                    'negative': random.uniform(0, 1),
                    'neutral': random.uniform(0, 1)
                }
            }
        elif model_type == 'classification':
            categories = ['category_a', 'category_b', 'category_c']
            result = {
                'category': random.choice(categories),
                'confidence': random.uniform(0.5, 0.99)
            }
        else:
            result = {
                'prediction': f"Processed input: {json.dumps(input_data)[:50]}...",
                'value': random.uniform(0, 100)
            }
        
        confidence_score = random.uniform(0.6, 0.95)
        
        return jsonify({
            'prediction_result': result,
            'confidence_score': confidence_score,
            'model_type': model_type,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/models', methods=['GET'])
def get_models():
    """Get available AI models"""
    models = [
        {
            'id': 'text-gen-1',
            'name': 'Text Generator',
            'type': 'text-generation',
            'description': 'Advanced text generation model'
        },
        {
            'id': 'sentiment-1',
            'name': 'Sentiment Analyzer',
            'type': 'sentiment-analysis',
            'description': 'Analyze text sentiment'
        },
        {
            'id': 'classifier-1',
            'name': 'Content Classifier',
            'type': 'classification',
            'description': 'Classify content into categories'
        }
    ]
    
    return jsonify({'models': models})

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

if __name__ == '__main__':
    print("Starting Flask AI Backend...")
    print("Available endpoints:")
    print("- POST /api/chat - Chat with AI")
    print("- POST /api/predict - Make predictions")
    print("- GET /api/models - Get available models")
    print("- GET /api/health - Health check")
    print("\nServer running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)