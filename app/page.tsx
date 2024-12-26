import QuestionnaireForm from '../components/QuestionnaireForm'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">独立开发者能力评估</h1>
      <p className="mb-4">请根据以下陈述，选择最符合您情况的选项（1表示非常不同意，5表示非常同意）：</p>
      <QuestionnaireForm />
    </div>
  )
}

