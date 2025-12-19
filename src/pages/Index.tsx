import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Grade {
  id: string;
  value: number;
  date: string;
  topic: string;
}

interface Subject {
  id: string;
  name: string;
  grades: Grade[];
  quarterGrade?: number;
}

interface Homework {
  id: string;
  subject: string;
  task: string;
  deadline: string;
}

interface ScheduleDay {
  day: string;
  lessons: string[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [editDialog, setEditDialog] = useState<{open: boolean, type: string, data?: any}>({open: false, type: ''});
  const [editValue, setEditValue] = useState('');

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Математика',
      grades: [
        { id: '1', value: 5, date: '15.12', topic: 'Алгебра' },
        { id: '2', value: 4, date: '16.12', topic: 'Геометрия' },
        { id: '3', value: 5, date: '18.12', topic: 'Контрольная' },
      ],
      quarterGrade: 5
    },
    {
      id: '2',
      name: 'Русский язык',
      grades: [
        { id: '4', value: 4, date: '14.12', topic: 'Диктант' },
        { id: '5', value: 5, date: '17.12', topic: 'Сочинение' },
      ],
      quarterGrade: 4
    },
    {
      id: '3',
      name: 'Физика',
      grades: [
        { id: '6', value: 5, date: '15.12', topic: 'Лабораторная' },
        { id: '7', value: 5, date: '19.12', topic: 'Тест' },
      ],
      quarterGrade: 5
    },
  ]);

  const [homework, setHomework] = useState<Homework[]>([
    { id: '1', subject: 'Математика', task: 'Решить задачи №234-240', deadline: '20.12.2024' },
    { id: '2', subject: 'Русский язык', task: 'Написать эссе про зиму', deadline: '21.12.2024' },
    { id: '3', subject: 'Физика', task: 'Подготовиться к лабораторной работе', deadline: '22.12.2024' },
  ]);

  const [schedule] = useState<ScheduleDay[]>([
    { day: 'Понедельник', lessons: ['Математика', 'Русский язык', 'История', 'Физика', 'Английский'] },
    { day: 'Вторник', lessons: ['Физика', 'Химия', 'Математика', 'Литература', 'География'] },
    { day: 'Среда', lessons: ['Информатика', 'Математика', 'Биология', 'Русский язык', 'ОБЖ'] },
    { day: 'Четверг', lessons: ['Английский', 'История', 'Физика', 'Математика', 'Физкультура'] },
    { day: 'Пятница', lessons: ['Химия', 'Литература', 'География', 'Обществознание', 'Технология'] },
  ]);

  const handleEditGrade = (subjectId: string, gradeId: string, currentValue: number) => {
    setEditDialog({ open: true, type: 'grade', data: { subjectId, gradeId } });
    setEditValue(currentValue.toString());
  };

  const handleEditQuarter = (subjectId: string, currentValue?: number) => {
    setEditDialog({ open: true, type: 'quarter', data: { subjectId } });
    setEditValue(currentValue?.toString() || '');
  };

  const handleEditHomework = (homeworkId: string, currentTask: string) => {
    setEditDialog({ open: true, type: 'homework', data: { homeworkId } });
    setEditValue(currentTask);
  };

  const saveEdit = () => {
    if (editDialog.type === 'grade') {
      const newValue = parseInt(editValue);
      if (newValue >= 2 && newValue <= 5) {
        setSubjects(subjects.map(subject => 
          subject.id === editDialog.data.subjectId
            ? {
                ...subject,
                grades: subject.grades.map(grade =>
                  grade.id === editDialog.data.gradeId
                    ? { ...grade, value: newValue }
                    : grade
                )
              }
            : subject
        ));
        toast.success('Оценка изменена');
      } else {
        toast.error('Оценка должна быть от 2 до 5');
        return;
      }
    } else if (editDialog.type === 'quarter') {
      const newValue = parseInt(editValue);
      if (newValue >= 2 && newValue <= 5) {
        setSubjects(subjects.map(subject =>
          subject.id === editDialog.data.subjectId
            ? { ...subject, quarterGrade: newValue }
            : subject
        ));
        toast.success('Четвертная оценка изменена');
      } else {
        toast.error('Оценка должна быть от 2 до 5');
        return;
      }
    } else if (editDialog.type === 'homework') {
      setHomework(homework.map(hw =>
        hw.id === editDialog.data.homeworkId
          ? { ...hw, task: editValue }
          : hw
      ));
      toast.success('Задание изменено');
    }
    setEditDialog({ open: false, type: '' });
  };

  const calculateAverage = (grades: Grade[]) => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g.value, 0);
    return (sum / grades.length).toFixed(1);
  };

  const getGradeColor = (value: number) => {
    if (value === 5) return 'bg-green-600';
    if (value === 4) return 'bg-blue-600';
    if (value === 3) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary">Электронный дневник</h1>
            <Badge variant="outline" className="text-sm">
              Иванов Иван Иванович • 9А класс
            </Badge>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'grades', label: 'Оценки', icon: 'GraduationCap' },
              { id: 'homework', label: 'Задания', icon: 'BookOpen' },
              { id: 'quarters', label: 'Четверти', icon: 'Trophy' },
              { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 transition-all"
              >
                <Icon name={tab.icon as any} size={18} />
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={24} />
                  Общая статистика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Средний балл</p>
                    <p className="text-3xl font-bold text-primary">
                      {(subjects.reduce((acc, s) => acc + parseFloat(calculateAverage(s.grades)), 0) / subjects.length).toFixed(1)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Всего оценок</p>
                    <p className="text-3xl font-bold text-primary">
                      {subjects.reduce((acc, s) => acc + s.grades.length, 0)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Домашних заданий</p>
                    <p className="text-3xl font-bold text-primary">{homework.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  Успеваемость по предметам
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subjects.map(subject => (
                    <div key={subject.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Средний:</span>
                        <Badge className={`${getGradeColor(parseInt(calculateAverage(subject.grades)))}`}>
                          {calculateAverage(subject.grades)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="space-y-6 animate-fade-in">
            {subjects.map(subject => (
              <Card key={subject.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{subject.name}</span>
                    <Badge variant="outline">
                      Средний балл: {calculateAverage(subject.grades)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {subject.grades.map(grade => (
                      <button
                        key={grade.id}
                        onClick={() => handleEditGrade(subject.id, grade.id, grade.value)}
                        className="p-4 bg-muted rounded-lg hover:bg-muted/70 transition-all cursor-pointer group"
                      >
                        <div className={`w-12 h-12 mx-auto rounded-full ${getGradeColor(grade.value)} flex items-center justify-center text-2xl font-bold mb-2 group-hover:scale-110 transition-transform`}>
                          {grade.value}
                        </div>
                        <p className="text-xs text-muted-foreground text-center">{grade.date}</p>
                        <p className="text-xs text-center mt-1">{grade.topic}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'homework' && (
          <div className="space-y-4 animate-fade-in">
            {homework.map(hw => (
              <Card key={hw.id} className="hover:bg-card/80 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{hw.subject}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          до {hw.deadline}
                        </span>
                      </div>
                      <p className="text-foreground">{hw.task}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditHomework(hw.id, hw.task)}
                      className="hover-scale"
                    >
                      <Icon name="Edit" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'quarters' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Award" size={24} />
                  Итоговые оценки за 2 четверть
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => handleEditQuarter(subject.id, subject.quarterGrade)}
                      className="p-6 bg-muted rounded-lg hover:bg-muted/70 transition-all cursor-pointer group"
                    >
                      <h3 className="font-semibold text-lg mb-3">{subject.name}</h3>
                      <div className={`w-20 h-20 mx-auto rounded-full ${getGradeColor(subject.quarterGrade || 0)} flex items-center justify-center text-4xl font-bold group-hover:scale-110 transition-transform`}>
                        {subject.quarterGrade || '—'}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4 animate-fade-in">
            {schedule.map((day, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{day.day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {day.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Badge variant="secondary" className="w-8 h-8 flex items-center justify-center">
                          {lessonIndex + 1}
                        </Badge>
                        <span className="font-medium">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({ ...editDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editDialog.type === 'grade' && 'Изменить оценку'}
              {editDialog.type === 'quarter' && 'Изменить четвертную оценку'}
              {editDialog.type === 'homework' && 'Изменить домашнее задание'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {(editDialog.type === 'grade' || editDialog.type === 'quarter') && (
              <Input
                type="number"
                min="2"
                max="5"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Введите оценку (2-5)"
              />
            )}
            {editDialog.type === 'homework' && (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Введите новое задание"
                rows={4}
              />
            )}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditDialog({ open: false, type: '' })}>
                Отмена
              </Button>
              <Button onClick={saveEdit}>Сохранить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
