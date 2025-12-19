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
      name: 'Русский язык',
      grades: [
        { id: '1', value: 4, date: '14.12', topic: 'Диктант' },
        { id: '2', value: 5, date: '17.12', topic: 'Сочинение' },
      ],
      quarterGrade: 4
    },
    {
      id: '2',
      name: 'Литература',
      grades: [
        { id: '3', value: 5, date: '15.12', topic: 'Анализ стихотворения' },
        { id: '4', value: 4, date: '18.12', topic: 'Тест' },
      ],
      quarterGrade: 5
    },
    {
      id: '3',
      name: 'Родной язык и родная литература',
      grades: [
        { id: '5', value: 5, date: '16.12', topic: 'Устный ответ' },
      ],
      quarterGrade: 5
    },
    {
      id: '4',
      name: 'Иностранный язык',
      grades: [
        { id: '6', value: 4, date: '15.12', topic: 'Грамматика' },
        { id: '7', value: 5, date: '19.12', topic: 'Говорение' },
      ],
      quarterGrade: 4
    },
    {
      id: '5',
      name: 'Алгебра',
      grades: [
        { id: '8', value: 5, date: '15.12', topic: 'Уравнения' },
        { id: '9', value: 4, date: '16.12', topic: 'Контрольная' },
        { id: '10', value: 5, date: '18.12', topic: 'Самостоятельная' },
      ],
      quarterGrade: 5
    },
    {
      id: '6',
      name: 'Геометрия',
      grades: [
        { id: '11', value: 4, date: '14.12', topic: 'Теоремы' },
        { id: '12', value: 5, date: '19.12', topic: 'Задачи' },
      ],
      quarterGrade: 4
    },
    {
      id: '7',
      name: 'Информатика',
      grades: [
        { id: '13', value: 5, date: '15.12', topic: 'Программирование' },
        { id: '14', value: 5, date: '17.12', topic: 'Практическая' },
      ],
      quarterGrade: 5
    },
    {
      id: '8',
      name: 'История',
      grades: [
        { id: '15', value: 4, date: '14.12', topic: 'Древний мир' },
        { id: '16', value: 4, date: '18.12', topic: 'Тест' },
      ],
      quarterGrade: 4
    },
    {
      id: '9',
      name: 'Обществознание',
      grades: [
        { id: '17', value: 5, date: '16.12', topic: 'Конституция' },
        { id: '18', value: 4, date: '19.12', topic: 'Устный ответ' },
      ],
      quarterGrade: 5
    },
    {
      id: '10',
      name: 'География',
      grades: [
        { id: '19', value: 4, date: '15.12', topic: 'Карты' },
        { id: '20', value: 5, date: '17.12', topic: 'Контурная карта' },
      ],
      quarterGrade: 4
    },
    {
      id: '11',
      name: 'Биология',
      grades: [
        { id: '21', value: 5, date: '14.12', topic: 'Клетка' },
        { id: '22', value: 5, date: '18.12', topic: 'Лабораторная' },
      ],
      quarterGrade: 5
    },
    {
      id: '12',
      name: 'Физика',
      grades: [
        { id: '23', value: 5, date: '15.12', topic: 'Механика' },
        { id: '24', value: 4, date: '19.12', topic: 'Задачи' },
      ],
      quarterGrade: 5
    },
    {
      id: '13',
      name: 'Химия',
      grades: [
        { id: '25', value: 4, date: '16.12', topic: 'Реакции' },
        { id: '26', value: 5, date: '18.12', topic: 'Практическая' },
      ],
      quarterGrade: 4
    },
    {
      id: '14',
      name: 'Труд (Технология)',
      grades: [
        { id: '27', value: 5, date: '15.12', topic: 'Проект' },
        { id: '28', value: 5, date: '19.12', topic: 'Практическая' },
      ],
      quarterGrade: 5
    },
    {
      id: '15',
      name: 'Физическая культура',
      grades: [
        { id: '29', value: 5, date: '14.12', topic: 'Нормативы' },
        { id: '30', value: 5, date: '17.12', topic: 'Техника' },
      ],
      quarterGrade: 5
    },
    {
      id: '16',
      name: 'Основы безопасности и защиты Родины',
      grades: [
        { id: '31', value: 5, date: '16.12', topic: 'Теория' },
        { id: '32', value: 4, date: '19.12', topic: 'Тест' },
      ],
      quarterGrade: 5
    },
  ]);

  const [homework, setHomework] = useState<Homework[]>([
    { id: '1', subject: 'Алгебра', task: 'Решить задачи №234-240', deadline: '20.12.2024' },
    { id: '2', subject: 'Русский язык', task: 'Написать эссе про зиму', deadline: '21.12.2024' },
    { id: '3', subject: 'Физика', task: 'Подготовиться к лабораторной работе', deadline: '22.12.2024' },
    { id: '4', subject: 'История', task: 'Выучить параграф 15-16', deadline: '21.12.2024' },
    { id: '5', subject: 'Химия', task: 'Оформить практическую работу', deadline: '23.12.2024' },
  ]);

  const [schedule] = useState<ScheduleDay[]>([
    { day: 'Понедельник', lessons: ['Алгебра', 'Русский язык', 'История', 'Физика', 'Иностранный язык', 'Физическая культура'] },
    { day: 'Вторник', lessons: ['Физика', 'Химия', 'Геометрия', 'Литература', 'География', 'Труд (Технология)'] },
    { day: 'Среда', lessons: ['Информатика', 'Алгебра', 'Биология', 'Русский язык', 'Обществознание'] },
    { day: 'Четверг', lessons: ['Иностранный язык', 'История', 'Физика', 'Геометрия', 'Физическая культура', 'ОБЗР'] },
    { day: 'Пятница', lessons: ['Химия', 'Литература', 'География', 'Родной язык и родная литература', 'Биология'] },
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
              Котов Андрей • 8Е класс
            </Badge>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'grades', label: 'Оценки', icon: 'GraduationCap' },
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
                      <div key={grade.id} className="relative p-4 bg-muted rounded-lg group">
                        <button
                          onClick={() => handleEditGrade(subject.id, grade.id, grade.value)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-background/50 rounded"
                        >
                          <Icon name="Pencil" size={12} className="text-muted-foreground" />
                        </button>
                        <div className={`w-12 h-12 mx-auto rounded-full ${getGradeColor(grade.value)} flex items-center justify-center text-2xl font-bold mb-2`}>
                          {grade.value}
                        </div>
                        <p className="text-xs text-muted-foreground text-center">{grade.date}</p>
                        <p className="text-xs text-center mt-1">{grade.topic}</p>
                      </div>
                    ))}
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
                    <div key={subject.id} className="relative p-6 bg-muted rounded-lg group">
                      <button
                        onClick={() => handleEditQuarter(subject.id, subject.quarterGrade)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-background/50 rounded"
                      >
                        <Icon name="Pencil" size={14} className="text-muted-foreground" />
                      </button>
                      <h3 className="font-semibold text-lg mb-3">{subject.name}</h3>
                      <div className={`w-20 h-20 mx-auto rounded-full ${getGradeColor(subject.quarterGrade || 0)} flex items-center justify-center text-4xl font-bold`}>
                        {subject.quarterGrade || '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" size={24} />
                  Домашние задания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {homework.map(hw => (
                    <div key={hw.id} className="relative p-4 bg-muted rounded-lg group">
                      <button
                        onClick={() => handleEditHomework(hw.id, hw.task)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-background/50 rounded"
                      >
                        <Icon name="Pencil" size={14} className="text-muted-foreground" />
                      </button>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{hw.subject}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          до {hw.deadline}
                        </span>
                      </div>
                      <p className="text-foreground">{hw.task}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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