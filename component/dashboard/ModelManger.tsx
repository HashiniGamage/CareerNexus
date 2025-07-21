'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Brain, Edit, Trash2 } from 'lucide-react'

interface ModelManagerProps {
  user: User
}

export default function ModelManager({ user }: ModelManagerProps) {
  const [models, setModels] = useState<any[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    model_type: 'text-generation'
  })
  const supabase = createClient()

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    const { data } = await supabase
      .from('ai_models')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    setModels(data || [])
  }

  const createModel = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase
      .from('ai_models')
      .insert({
        ...newModel,
        user_id: user.id,
        parameters: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1.0
        }
      })

    if (!error) {
      setNewModel({ name: '', description: '', model_type: 'text-generation' })
      setIsCreating(false)
      fetchModels()
    }
  }

  const deleteModel = async (id: string) => {
    if (confirm('Are you sure you want to delete this model?')) {
      await supabase.from('ai_models').delete().eq('id', id)
      fetchModels()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Models</h2>
          <p className="text-gray-600">Manage your AI model configurations</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Model
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Model</CardTitle>
            <CardDescription>Configure a new AI model</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createModel} className="space-y-4">
              <Input
                placeholder="Model Name"
                value={newModel.name}
                onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                required
              />
              <Input
                placeholder="Description"
                value={newModel.description}
                onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded-md"
                value={newModel.model_type}
                onChange={(e) => setNewModel({ ...newModel, model_type: e.target.value })}
              >
                <option value="text-generation">Text Generation</option>
                <option value="image-analysis">Image Analysis</option>
                <option value="sentiment-analysis">Sentiment Analysis</option>
                <option value="classification">Classification</option>
              </select>
              <div className="flex space-x-2">
                <Button type="submit">Create Model</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <Card key={model.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 text-blue-600 mr-2" />
                  <div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {model.model_type.replace('-', ' ').toUpperCase()}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteModel(model.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {model.description || 'No description provided'}
              </p>
              <div className="text-xs text-gray-500">
                Created: {new Date(model.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {models.length === 0 && !isCreating && (
        <Card>
          <CardContent className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No models yet</h3>
            <p className="text-gray-600 mb-4">Create your first AI model to get started</p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Model
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}