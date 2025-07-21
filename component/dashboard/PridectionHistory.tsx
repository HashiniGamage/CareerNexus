'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart3, TrendingUp, Activity } from 'lucide-react'

interface PredictionHistoryProps {
  user: User
}

export default function PredictionHistory({ user }: PredictionHistoryProps) {
  const [predictions, setPredictions] = useState<any[]>([])
  const [stats, setStats] = useState({
    total: 0,
    avgConfidence: 0,
    thisWeek: 0
  })
  const supabase = createClient()

  useEffect(() => {
    fetchPredictions()
  }, [])

  const fetchPredictions = async () => {
    const { data } = await supabase
      .from('ai_predictions')
      .select(`
        *,
        ai_models (name, model_type)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
    
    if (data) {
      setPredictions(data)
      
      // Calculate stats
      const total = data.length
      const avgConfidence = data.reduce((sum, p) => sum + p.confidence_score, 0) / total || 0
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const thisWeek = data.filter(p => new Date(p.created_at) > weekAgo).length
      
      setStats({ total, avgConfidence, thisWeek })
    }
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100'
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Prediction History</h2>
        <p className="text-gray-600">View your AI model predictions and performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time predictions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.avgConfidence * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Model confidence score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">Predictions this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
          <CardDescription>Your latest AI model predictions</CardDescription>
        </CardHeader>
        <CardContent>
          {predictions.length > 0 ? (
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">
                          {prediction.ai_models?.name || 'Unknown Model'}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {prediction.ai_models?.model_type || 'Unknown Type'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Input:</strong> {JSON.stringify(prediction.input_data).slice(0, 100)}...
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <strong>Result:</strong> {JSON.stringify(prediction.prediction_result).slice(0, 100)}...
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(
                          prediction.confidence_score
                        )}`}
                      >
                        {(prediction.confidence_score * 100).toFixed(1)}% confidence
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(prediction.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No predictions yet</h3>
              <p className="text-gray-600">Start using your AI models to see predictions here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}