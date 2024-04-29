import { isPlatformBrowser } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { TasksServiceService } from '../../services/tasks-service.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrl: './supervisor.component.scss'
})
export class SupervisorComponent implements AfterViewInit {
  @ViewChild('chart') chartElement!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  tasks: any ;
  tasksNoFilter: any ;
  tasksFilter: any ;
  isTotal = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private _serviceT:TasksServiceService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._serviceT.getTasksOrderSuper().subscribe({
        next: (dataT: any) => {
          
          this.tasks = dataT.tasks;
          this.tasksNoFilter = dataT;
          if (isPlatformBrowser(this.platformId)) {
            const data = {
              labels: ['Enviados', 'Pendientes', 'Enviados Tarde', 'Enviados a Tiempo'],
              datasets: [{
                label: 'Total',
                data: [dataT.sendTasks.length, dataT.noSendTasks.length, dataT.laterTasks.length, dataT.noLaterTasks.length],
                backgroundColor: [
                  'rgba(40,255,0,0.5)',
                  'rgba(255,156,0,0.5)',
                  'rgba(249,0,25,0.5)',
                  'rgba(0,252,171,0.5)',
                ],
                borderColor: [
                  'rgba(40,255,0)',
                  'rgba(255,156,0)',
                  'rgba(249,0,25)',
                  'rgba(0,252,171)',
                ],
                borderWidth: 1
              }]
            }

            if (this.chartElement && this.chartElement.nativeElement) {
              const ctx = this.chartElement.nativeElement.getContext('2d');
              if (ctx !== null) {
                this.chart = new Chart(ctx, {
                  type: 'pie' as ChartType,
                  data
                });
              }
            }
          }
        }
      })
    }, 0);
  }

  showTotal() {
    this.tasksFilter = undefined;
    this.isTotal = true;
  }

  showSend() {
    this.tasksFilter = this.tasksNoFilter.sendTasks;
    this.isTotal = false;
  }

  showNoSend() {
    this.tasksFilter = this.tasksNoFilter.noSendTasks;
    this.isTotal = false;

  }

  showLater() {
    this.tasksFilter = this.tasksNoFilter.laterTasks;
    this.isTotal = false;

  }

  showNoLater() {
    this.tasksFilter = this.tasksNoFilter.noLaterTasks;
    this.isTotal = false;

  }

}
