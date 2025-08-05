import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/lib/markdown';
import { Link } from 'react-router-dom';

interface BlogCalendarProps {
  articles: BlogPost[];
}

const BlogCalendar: React.FC<BlogCalendarProps> = ({ articles }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getArticlesForDate = (date: Date) => {
    return articles.filter(article => {
      const articleDate = new Date(article.date);
      return articleDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const today = new Date();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Publication Calendar
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h4 className="font-medium text-center min-w-[150px]">{getMonthName(currentDate)}</h4>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2" />
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const articlesForDay = getArticlesForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            const hasArticles = articlesForDay.length > 0;
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : date)}
                className={`p-2 text-sm rounded-md transition-colors relative min-h-[36px] ${
                  isToday
                    ? 'bg-primary text-primary-foreground font-bold'
                    : isSelected
                    ? 'bg-accent font-medium'
                    : hasArticles
                    ? 'bg-accent/50 hover:bg-accent'
                    : 'hover:bg-accent/30'
                }`}
                title={hasArticles ? `${articlesForDay.length} article(s) published` : undefined}
              >
                {day}
                {hasArticles && (
                  <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
                    isToday ? 'bg-white' : 'bg-primary'
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Articles */}
        {selectedDate && getArticlesForDate(selectedDate).length > 0 && (
          <div className="border-t pt-4">
            <h5 className="font-medium text-sm mb-2">
              Articles from {selectedDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: selectedDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
              })}
            </h5>
            <div className="space-y-2">
              {getArticlesForDate(selectedDate).map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="block p-3 text-xs border border-border rounded-md hover:bg-accent transition-colors"
                >
                  <div className="font-medium line-clamp-2 mb-1">{article.title}</div>
                  <div className="text-muted-foreground flex items-center justify-between">
                    <span>{article.category}</span>
                    <span>{article.readingTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent Posts */}
        <div className="border-t pt-4 mt-4">
          <h5 className="font-medium text-sm mb-3">Recent Posts</h5>
          <div className="space-y-2">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="block p-3 text-xs border border-border rounded-md hover:bg-accent transition-colors"
              >
                <div className="font-medium line-clamp-2 mb-1">{article.title}</div>
                <div className="text-muted-foreground flex items-center justify-between">
                  <span>{article.category}</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCalendar;