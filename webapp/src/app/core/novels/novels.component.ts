import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Novel } from '../../shared/shared.module'

@Component(
{
    templateUrl: './novels.component.html'
})
export class NovelsComponent implements OnInit
{
    novels: Novel[]

    constructor(private route: ActivatedRoute) {}

    async ngOnInit()
    {
        this.novels = this.route.snapshot.data['novels']
    }
}
