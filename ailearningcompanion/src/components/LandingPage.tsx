import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Brain, Upload, Sparkles, History, ArrowRight, CheckCircle2 } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#1F2937]">Chathub</span>
          </div>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[#1F2937] mb-6 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            ChatHub - using multi ai
          </h1>
          <p className="text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Upload notes, ask questions, learn smarter with ChatGPT and Gemini at your fingertips
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 transition-opacity px-8 py-6 h-auto"
            size="lg"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          {/* Illustration placeholder */}
          <div className="mt-16 relative">
            <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 flex items-center justify-center border border-[#6366F1]/20 shadow-xl">
              <div className="text-center">
                <Brain className="w-32 h-32 mx-auto text-[#6366F1] mb-4" />
                <p className="text-[#6B7280]">AI Learning Assistant Interface</p>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 left-12 bg-white rounded-lg shadow-lg p-4 transform -rotate-6">
              <Upload className="w-8 h-8 text-[#14B8A6]" />
            </div>
            <div className="absolute top-12 right-12 bg-white rounded-lg shadow-lg p-4 transform rotate-6">
              <Sparkles className="w-8 h-8 text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-[#1F2937] text-center mb-12">
          Everything You Need to Study Smarter
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#6366F1]" />
              </div>
              <h3 className="text-[#1F2937] mb-2">{feature.title}</h3>
              <p className="text-[#6B7280]">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white rounded-3xl my-20">
        <h2 className="text-[#1F2937] text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6 shadow-lg">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#1F2937] mb-3">{step.title}</h3>
              <p className="text-[#6B7280]">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-[#6366F1]/30" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-white/90 mb-8">
            Join thousands of students already learning smarter with AI
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="bg-white text-[#6366F1] hover:bg-gray-100 px-8 py-6 h-auto"
          >
            Get Started for Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-[#6B7280]">
          <p>© 2025 ChatHub - using multi ai.</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: 'Multi-AI Support',
    description: 'Switch between ChatGPT-4 and Gemini for diverse perspectives on your questions',
  },
  {
    icon: Upload,
    title: 'Upload & Learn',
    description: 'Upload PDFs, notes, and documents. Let AI understand your study materials',
  },
  {
    icon: Sparkles,
    title: 'Smart Summaries',
    description: 'Get instant summaries, explanations, and key concept breakdowns',
  },
  {
    icon: History,
    title: 'Save History',
    description: 'Access all your conversations and insights anytime, anywhere',
  },
];

const steps = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'Drag and drop your study materials, notes, or PDFs',
  },
  {
    icon: Brain,
    title: 'Ask',
    description: 'Ask questions about your content using natural language',
  },
  {
    icon: CheckCircle2,
    title: 'Get Answers',
    description: 'Receive intelligent, context-aware answers instantly',
  },
];